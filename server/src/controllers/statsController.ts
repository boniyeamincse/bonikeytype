import { Request, Response } from 'express';
import { query } from '../db.js';

export const saveTest = async (req: any, res: Response) => {
    const { wpm, accuracy, raw_wpm, errors, mode, mode_value, language } = req.body;
    const userId = req.user.id;

    try {
        const result = await query(
            'INSERT INTO typing_tests (user_id, wpm, accuracy, raw_wpm, errors, mode, mode_value, language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [userId, wpm, accuracy, raw_wpm, errors, mode, mode_value, language]
        );

        const test = result.rows[0];

        // Update leaderboard if this is the user's best WPM
        const leaderboardResult = await query('SELECT best_wpm FROM leaderboard WHERE user_id = $1', [userId]);

        if (leaderboardResult.rows.length === 0) {
            await query('INSERT INTO leaderboard (user_id, best_wpm) VALUES ($1, $2)', [userId, wpm]);
        } else if (wpm > leaderboardResult.rows[0].best_wpm) {
            await query('UPDATE leaderboard SET best_wpm = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2', [wpm, userId]);
        }

        // Add XP (simple calculation)
        const xpGain = Math.floor(wpm * (accuracy / 100));
        await query('UPDATE users SET xp = xp + $1 WHERE id = $2', [xpGain, userId]);

        res.status(201).json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserHistory = async (req: any, res: Response) => {
    const userId = req.user.id;

    try {
        const result = await query(
            'SELECT * FROM typing_tests WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const result = await query(
            `SELECT l.best_wpm, u.username, u.avatar_url 
       FROM leaderboard l 
       JOIN users u ON l.user_id = u.id 
       ORDER BY l.best_wpm DESC 
       LIMIT 100`
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
