import { Request, Response } from 'express';
import { query } from '../db.js';

export const getRandomQuote = async (req: Request, res: Response) => {
    const { language } = req.query;

    try {
        const result = await query(
            'SELECT * FROM quotes WHERE language = $1 ORDER BY RANDOM() LIMIT 1',
            [language || 'english']
        );

        if (result.rows.length === 0) {
            // Fallback if no quotes found for language
            const fallback = await query('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1');
            return res.json(fallback.rows[0] || { text: 'Default quote because database is empty.', author: 'System' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const addQuote = async (req: Request, res: Response) => {
    const { text, author, language, difficulty } = req.body;

    try {
        const result = await query(
            'INSERT INTO quotes (text, author, language, difficulty) VALUES ($1, $2, $3, $4) RETURNING *',
            [text, author, language || 'english', difficulty || 'medium']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
