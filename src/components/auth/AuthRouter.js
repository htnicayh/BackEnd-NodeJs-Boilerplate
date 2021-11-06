import { Router } from 'express'
import * as authController from './AuthController.js'

const router = Router();
const path = '/auth'

router.post('/login', authController.login)
router.post('/regist', authController.regist)

export default { path, router }