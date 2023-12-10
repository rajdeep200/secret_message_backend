import express from 'express';
const router = express();
import { UserController } from "../controllers/userController.js";
router.get('/', UserController.getAllUsers);
router.post('/register', UserController.register);
export { router as userRoutes };
//# sourceMappingURL=userRouter.js.map