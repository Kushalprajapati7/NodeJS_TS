import { Router } from 'express'
import {getProfiles,getProfilebyId,createProfile, updateProfileById, deleteProfileById} from '../controllers/profile.controller'

const router = Router();

router.get('/profile', getProfiles);
router.get('/profile/:id', getProfilebyId);
router.post('/profile', createProfile);
router.put('/profile/:id', updateProfileById);
router.delete('/profile/:id', deleteProfileById);

export default router;
