import * as database from '../../util/Database.js'
import * as bcrypt from '../../util/Bcrypt.js'
import { ERRORS } from '../../constant/Error.js'

export const getUserById = async (userId) => {
    const sql = 'SELECT * FROM account WHERE id = ?'
    const result = await database.queryOne(sql, [userId])
    delete result.password
    return result
}

export const getAllUser = async () => {
    const sql = 'SELECT * FROM account'
    const results = await database.query(sql, [])
    for (let i = 0; i < results.length; i++) {
        delete results[i].password
        delete results[i].role
    }
    return results
}

export const updateUser = async (userId, payload) => {
    let sqlQuery = 'UPDATE user SET id = id';
    let params = []
    if (payload.name) {
        sqlQuery += ', name = ?'
        params.push(payload.name)
    }
    if (payload.password) {
        let hashPw = await bcrypt.hash(payload.password)
        sqlQuery += ', password = ?'
        params.push(hashPw)
    }
    if (payload.email) {
        sqlQuery += ', email = ?'
        params.push(email)
    }
    if (payload.address) {
        sqlQuery += ', address = ?'
        params.push(payload.address)
    }
    if (payload.birth) {
        sqlQuery += ', birth = ?'
        params.push(payload.birth)
    }
    if (payload.gender) {
        const { gender } = payload
        if (gender === 1 || gender === 2) {
            sqlQuery += ', gender = ?'
            params.push(payload.gender)
        } else {
            throw ERRORS.INVALID_INPUT_PARAMS
        }
    }
    if (payload.image) {
        sqlQuery += ', image = ?'
        params.push(payload.image)
    }
    let sql = sqlQuery + ' WHERE userId = ?'
    params.push(userId)
    const result = await database.queryOne(sql, params)
    return result
}