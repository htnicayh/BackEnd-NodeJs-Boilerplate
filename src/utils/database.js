import mysql from 'mysql'
import config from '../config/config.js'

const pool = mysql.createPool(config.MYSQL_URL);

export const getConnection = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            return resolve(connection);
        })
    })
}

export const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

export const queryOne = async (sql, params) => {
    const results = await query(sql, params);
    return results[0];
};


// Transaction

export const beginTransaction = async () => {
    const connection = await getConnection()
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) {
                connection.release()
                return reject(err)
            } else {
                return resolve(connection)
            }
        })
    })
}

export const rollbackTransaction = async (transaction) => {
    return new Promise((resolve, reject) => {
        transaction.rollback((err) => {
            transaction.release()
            if (err) {
                return reject(err)
            } else {
                return resolve()
            }
        })
    })
}

export const commitTransaction = async (transaction) => {
    return new Promise((resolve, reject) => {
        transaction.commit(async (errorCommit) => {
            if (errorCommit) {
                try {
                    await rollbackTransaction(transaction)
                    return reject(errorCommit)
                } catch (errorRollback) {
                    return reject(Object.assign(errorCommit, { errorRollback }))
                }
            }
            transaction.release()
            return resolve()
        })
    })
}

export const executeTransaction = async (sql, params, transaction) => {
    return new Promise((resolve, reject) => {
        if (!transaction) {
            pool.query(sql, params, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(results)
                }
            })
        } else {
            transaction.query(sql, params, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    transaction.release()
                    return resolve(results)
                }
            })
        }
    })
}