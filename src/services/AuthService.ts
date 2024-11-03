import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { Request, Response, NextFunction } from 'express';

// Set the JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

// Define a User interface
interface IUser {
    _id: string;
    username: string;
    password: string;
}

// Extend the Request interface to include user property
interface IRequest extends Request {
    user?: IUser; // Optional user property
}

// Register a user
export const registerUser = async (username: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
};

// Login a user
export const loginUser = async (username: string, password: string): Promise<{ token: string }> => {
    const user: IUser | null = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return { token };
};

// Authenticate token middleware
export const authenticateToken = (req: IRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("token", token);
    if (!token) res.sendStatus(401);
    
    jwt.verify(token, JWT_SECRET, (err, user: IUser | undefined) => {
        if (err) return res.sendStatus(403);
        req.user = user; // Assign the decoded user info to the request object
        next();
    });
};
