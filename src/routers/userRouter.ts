import express from 'express'
const router = express()
import { UserController } from "../controllers/userController.js";
import { authenticate } from '../middlewares/jwtMiddleware.js';

router.get('/', authenticate, UserController.getAllUsers)
router.post('/register', UserController.register)
router.post('/login', UserController.login)

export {router as userRoutes};