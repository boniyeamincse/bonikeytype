import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authProtect, getMe);

export default router;
