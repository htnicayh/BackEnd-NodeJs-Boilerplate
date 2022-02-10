import bcrypt from 'bcrypt'

export const hash = async (text) => {
    const salt = bcrypt.genSaltSync(12)
    return bcrypt.hashSync(text, salt)
}

export const compare = (text, encrypted) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(text, encrypted, (err, data) => {
            if (!err) {
                return resolve(data)
            }
            return reject(err)
        })
    })
}