import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { IUser, User } from "../models/user.model";

interface IUserWithoutPassword extends Omit<IUser, 'password'> { }

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as IUserWithoutPassword;
        const foundUser = await User.findOne({ id: decodedToken.id }).select('-password');
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}