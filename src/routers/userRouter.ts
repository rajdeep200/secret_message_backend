import express from 'express'
const router = express()
import { UserController } from "../controllers/userController.js";
import { authenticate, validateToken } from '../middlewares/jwtMiddleware.js';

router.get('/all', authenticate, UserController.getAllUsers)
router.get('/', authenticate, validateToken, UserController.getAllUserByUsername)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

export {router as userRoutes};