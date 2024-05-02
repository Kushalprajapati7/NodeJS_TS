import { Request, Response } from 'express';
import Profile, { IProfile } from '../models/profile.model';

export const createProfile = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = (req.session as any).userId;
        const { name, age } = req.body;
        console.log(userId);

        const newProfile: IProfile = new Profile({ userId, name, age });

        await newProfile.save();

        res.status(200).json(newProfile)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getProfiles = async (req: Request, res: Response): Promise<void> => {
    try {

        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }

        const userId = (req.session as any).userId;
        const profile: IProfile | null = await Profile.findOne({ userId });

        if (!profile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }

        // Send profile in the response
        res.status(200).json(profile);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getProfilebyId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }

        const profile: IProfile | null = await Profile.findById(id);
        if (!profile) {
            res.status(404).json({ message: 'Profile Not Found' })
        }
        res.status(200).json(profile)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}


export const updateProfileById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const updatedProfile: IProfile | null = await Profile.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProfile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        res.status(200).json(updatedProfile);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProfileById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const profile: IProfile | null = await Profile.findByIdAndDelete(id);
        if (!profile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }

        res.status(200).json({ message: "Profile Deleted Succesfully " });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}