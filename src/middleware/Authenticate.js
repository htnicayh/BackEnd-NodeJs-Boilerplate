import * as jwt from '../util/Jwt.js'
import { ERRORS } from '../constant/Error.js'
import config from '../config/Config.js'

export const jwtFilter = async (req, res, next) => {
    const { authorization } = req.headers
    if (authorization && authorization.match(/^Bearer /g)) {
        const token = authorization.split(' ')[1]
        if (token) {
            try {
                const verifyToken = await jwt.verifyToken(token, config.JWT_SECRET);
                req.verifyToken = verifyToken
                next();
            } catch {
                next(ERRORS.UNAUTHORIZE_ERROR)
            }
        } else {
            next(ERRORS.UNAUTHORIZE_ERROR)
        }
    } else {
        next(ERRORS.TOKEN_REQUIRED)
    }
}