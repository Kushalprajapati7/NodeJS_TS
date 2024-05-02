import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find();
        res.status(200).json(users)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser: IUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user: IUser | null = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedUser: IUser | null = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user: IUser | null = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({message: "User Deleted Succesfully "});
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}