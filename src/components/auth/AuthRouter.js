import { Router } from 'express'
import * as authController from './AuthController.js'
import { jwtFilter } from '../../middleware/Authenticate.js'

const router = Router();
const path = '/auth'

router.post('/login', authController.login)
router.post('/regist', authController.regist)
router.post('/reload', jwtFilter, authController.reload)
router.post('/logout', jwtFilter, authController.logout)

export default { path, router }