import { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import { validateLogin } from '../../middlewares/ValidatorMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/login', validateLogin, authController.login.bind(authController));

export default router;
