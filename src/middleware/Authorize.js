import { ERRORS } from "../constant/error.js"

export const isAdmin = (req, res, next) => {
    const verifyToken = req.verifyToken
    if (verifyToken?.role === 'admin') {
        next();
    } else {
        next(ERRORS.TOKEN_NOT_ALLOW)
    }
}