import { Router } from 'express';
import { saveTest, getUserHistory, getLeaderboard } from '../controllers/statsController.js';
import { authProtect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authProtect, saveTest);
router.get('/history', authProtect, getUserHistory);
router.get('/leaderboard', getLeaderboard);

export default router;
