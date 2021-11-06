import jwt from 'jsonwebtoken'
import config from '../config/Config.js'
import { TOKEN } from '../constant/Token.js'

export const generateToken = (payload, secretSignature, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretSignature, options || { expiresIn: `${TOKEN.TOKEN_EXPIRED}s` }, (err, results) => {
            if (!err) {
                return resolve(results);
            }
            return reject(err)
        })
    })
}

export const verifyToken = (token, secretSignature) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretSignature, (err, results) => {
            if (!err) {
                return resolve(results)
            }
            return reject(err)
        })
    })
}