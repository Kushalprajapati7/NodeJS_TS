// controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Profile from '../models/profile.model';

interface SessionUser {
    userId: string;
    username: string;
    profileId: string
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        // console.log(username);

        if (user && user.password === password) {
            const sessionUser = req.session as unknown as SessionUser;

            sessionUser.userId = user._id;
         
            (req.session as any).userId = user._id;
            console.log(sessionUser);
            // res.status(200).json({ message: 'Login successful' });

            const existingProfile = await Profile.findOne({ userId: user._id });
            // console.log(existingProfile);

            if (existingProfile) {
                res.redirect('/profile');
            } else {
                res.status(200).json({ message: 'Login successful' });
            }
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
};
