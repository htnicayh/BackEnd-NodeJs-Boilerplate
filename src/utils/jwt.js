import jwt from 'jsonwebtoken'
import { TOKEN } from '../constant/token.js'

export const generate = (payload, secretSignature, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretSignature, options || { expiresIn: `${TOKEN.TOKEN_EXPIRED}s` }, (err, results) => {
            if (!err) {
                return resolve(results);
            }
            return reject(err)
        })
    })
}

export const verify = (token, secretSignature) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretSignature, (err, results) => {
            if (!err) {
                return resolve(results)
            }
            return reject(err)
        })
    })
}