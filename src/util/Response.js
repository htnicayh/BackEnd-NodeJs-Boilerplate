import { STATUS } from "../constant/Status.js"

export const response = 
    (DATA,
    CODE = STATUS.NOT_ERROR.CODE,
    MESSAGE = STATUS.NOT_ERROR.MESSAGE) => {
        return { CODE, MESSAGE, DATA }
    }