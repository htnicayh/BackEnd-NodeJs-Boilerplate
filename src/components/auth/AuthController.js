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
                const token = await jwt.generateToken(data, config.JWT_SECRET, { expiresIn: `${TOKEN.TOKEN_EXPIRED}s` })
                const refreshToken = await jwt.generateToken({username: data.username}, config.JWT_REFRESH_TOKEN, { expiresIn: `${TOKEN.REFRESH_TOKEN}s` })
                const listRefreshToken = await authDAL.getRefreshToken();
                const checkExist = listRefreshToken.includes(refreshToken)
                if (checkExist) {
                    next(ERRORS.TOKEN_ALREADY_EXIST)
                }
                await authDAL.saveRefreshToken(refreshToken)
                let tokenLife = {
                    token: token,
                    refreshToken: refreshToken,
                    // timeExpiresIn: TOKEN.TOKEN_EXPIRED
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

export const logout = async (req, res, next) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        next(ERRORS.UNAUTHORIZE_ERROR)
    }
    await authDAL.removeRefreshToken(refreshToken)
    res.status(200).json('Hang Out')
}

export const reload = async (req, res, next) => {
    const { refreshToken } = req.body
    if (refreshToken) {
        try {
            const results = await jwt.verifyToken(refreshToken, config.JWT_REFRESH_TOKEN)
            const user = await authDAL.getUserByUsername(results.username)
            if (user) {
                let data = {
                    userId: user.id,
                    username: user.username,
                    role: user.role
                }
                const token = await jwt.generateToken(data, config.JWT_SECRET, { expiresIn: TOKEN.TOKEN_EXPIRED })
                res.json(response({ token }))
                next();
            } else {
                next(ERRORS.UNAUTHORIZE_ERROR)
            }
        } catch (error) {
            next(ERRORS.TOKEN_NOT_ALLOW)
        }
    } else {
        next(ERRORS.UNAUTHORIZE_ERROR)
    }
}