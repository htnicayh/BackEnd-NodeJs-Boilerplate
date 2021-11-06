import * as database from '../../util/Database.js'

export const getUserByUsername = async (username) => {
    const sql = 'SELECT * FROM account WHERE username = ?';
    const result = await database.queryOne(sql, [username]);
    return result;
}

export const createNewAccount = async (username, password, email) => {
    let userRole = 'user'
    const sql = 'INSERT INTO account (username, password, email, role) VALUES (?, ?, ?, ?)';
    const result = await database.query(sql, [username, password, email, userRole]);
    return result;
}