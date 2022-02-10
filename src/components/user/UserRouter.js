import { Router } from 'express'
import { jwtFilter } from '../../middleware/authenticate.js'
import { isAdmin } from '../../middleware/authorize.js'
import * as userController from './UserController.js'

const router = Router();
const path = '/user'

router.get('/me', jwtFilter, userController.getUser);

// router.put('/update/me', jwtFilter, userController.updateUser);

router.get('/all', jwtFilter, isAdmin, userController.getAllUser);

export default { path, router }