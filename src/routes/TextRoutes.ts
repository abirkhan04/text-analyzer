import { Router, Request, Response, NextFunction } from 'express';
import { analyzeText, getTextAnalysis } from '../controllers/TextController';
import { authenticateToken, registerUser, loginUser } from '../services/AuthService';

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        await registerUser(username, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Type assertion for error to handle it as an instance of Error
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            // Handle unknown error types
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// User login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const { token } = await loginUser(username, password);
        res.json({ token });
    } catch (error) {
        // Type assertion for error to handle it as an instance of Error
        if (error instanceof Error) {
            res.status(401).json({ error: error.message });
        } else {
            // Handle unknown error types
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


router.post('/text',  authenticateToken, analyzeText);
router.get('/text/:id',  authenticateToken, getTextAnalysis);


export default router;
