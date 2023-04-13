import express, { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import z from 'zod';
import validate from '../middleware/validate.middlware';
import { IUser } from '../models/user.model';

const router = express.Router();

const loginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required', }).email(),
        password: z.number({ required_error: 'Password is required' }).min(6).max(32)
    })
});

// @route   POST /api/user/login
router.post('/login', validate(loginSchema), async (req, res) => {
    const { email, password } = req.body as Pick<IUser, 'email' | 'password'>;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '168h' });
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
});

const registerSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required' }).email(),
        firstName: z.string({ required_error: 'First name is required' }).min(2).max(14),
        lastName: z.string({ required_error: 'Last name is required' }).min(2).max(14),
        password: z.string({ required_error: 'Password is rqeuired' }).min(6).max(32)
    }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

// @route   POST /api/user/register
router.post('/register', validate(registerSchema), async (req: Request, res: Response) => {
    const { email, firstName, lastName, password } = req.body as RegisterSchema['body'];
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(409).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await new User({ email, firstName, lastName, password: hashedPassword }).save();
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '168h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export const userRouter = router;