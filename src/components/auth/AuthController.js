import config from "../../config/Config.js"
import { ERRORS } from '../../constant/Error.js'
import { TOKEN } from "../../constant/Token.js"
import * as bcrypt from '../../util/Bcrypt.js'
import * as jwt from "../../util/Jwt.js"
import { response } from '../../util/Response.js'
import * as authDAL from './AuthDAL.js'

export const login = async (req, res, next) => {
    const { username, password } = req.body
    if (username && password) {
        const user = await authDAL.getUserByUsername(username)
        if (user) {
            const comparePw = await bcrypt.compare(password, user.password)
            if (comparePw) {
                let data = {
                    userId: user.id,
                    username: user.username,
                    role: user.role
                }
                const token = await jwt.generateToken(data, config.JWT_SECRET, { expiresIn: TOKEN.TOKEN_EXPIRED })
                let tokenLife = {
                    token: token,
                    timeExpiresIn: TOKEN.TOKEN_EXPIRED
                }
                res.json(response(tokenLife));
            } else {
                next(ERRORS.INVALID_USERNAME_OR_PASSWORD_ERROR)
            }
        } else {
            next(ERRORS.INVALID_USERNAME_OR_PASSWORD_ERROR)
        }
    } else {
        next(ERRORS.INVALID_INPUT_PARAMS)
    }
}

export const regist = async (req, res, next) => {
    const { username, password, email } = req.body
    if (username && password) {
        const user = await authDAL.getUserByUsername(username)
        if (user) {
            next('USER_ALREADY_EXIST')
        } else {
            const hashPw = await bcrypt.hash(password);
            await authDAL.createNewAccount(username, hashPw, email)
            res.json(response(req.body))
        }
    } else {
        next(ERRORS.INVALID_INPUT_PARAMS)
    }
}