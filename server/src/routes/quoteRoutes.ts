import { Router } from 'express';
import { getRandomQuote, addQuote } from '../controllers/quoteController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/random', getRandomQuote);
router.post('/', authProtect, addQuote); // Note: Should probably be admin only, but for now authProtect

export default router;
