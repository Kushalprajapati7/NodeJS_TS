import { Router } from 'express'
import { getAllUsers, createUser,getUserById,updateUserById,deleteUserById } from '../controllers/user.controller';

const router = Router();

router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.put('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);

export default router;
