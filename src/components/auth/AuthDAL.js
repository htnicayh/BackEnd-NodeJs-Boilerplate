import { query, queryOne } from '../../utils/database.js'

export const getUserByUsername = async (username) => {
    const sql = 'SELECT * FROM account WHERE username = ?';
    const result = await queryOne(sql, [username]);
    return result;
}

export const createNewAccount = async (username, password, email) => {
    let userRole = 'user'
    const sql = 'INSERT INTO account (username, password, email, role) VALUES (?, ?, ?, ?)';
    const result = await query(sql, [username, password, email, userRole]);
    return result;
}

export const getRefreshToken = async () => {
    const sql = 'SELECT * FROM token'
    const results = await query(sql, [])
    return results
}

export const saveRefreshToken = async (refreshToken) => {
    const sql = 'INSERT INTO token (refresh_token) VALUES (?)';
    const result = await query(sql, [refreshToken])
    return result
}

export const removeRefreshToken = async (refreshToken) => {
    const sql = 'DELETE FROM token WHERE refresh_token = ?'
    const results = query(sql, [refreshToken])
    return results
}