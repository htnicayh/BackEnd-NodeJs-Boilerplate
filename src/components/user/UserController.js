import * as userDAL from './UserDAL.js'
import { response } from '../../utils/response.js'
import { ERRORS } from '../../constant/error.js'

export const getUser = async (req, res, next) => {
    const { verifyToken } = req
    const { userId } = verifyToken
    if (userId) {
        const result = await userDAL.getUserById(userId);
        res.json(response({ result }))
    } else {
        next(ERRORS.TOKEN_NOT_ALLOW)
    }
}

export const getAllUser = async (req, res, next) => {
    const results = await userDAL.getAllUser();
    res.json(response(results))
}

export const updateUser = async (req, res, next) => {
    const { payload } = req.body;
    const { verifyToken } = req

    await userDAL.updateUser(verifyToken.userId, payload)
    res.json(response({
        userId,
        payload
    }))
}