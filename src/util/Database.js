import mysql from 'mysql'
import config from '../config/Config.js'

const connection = mysql.createPool(config.MYSQL_URL);

export const getConnection = async () => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, connection) => {
            if (err) {
                return reject(err)
            }
            return resolve(connection);
        })
    })
}

export const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
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