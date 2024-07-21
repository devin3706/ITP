import express from 'express';
import { getUsers, getUserById, updateUserById, deleteUserById, createUser } from '../../controllers/student support/UserController.js';

const router = express.Router();

router.get('/', getUsers);                  // Get all users
router.get('/:id', getUserById);               // Get user by ID
router.put('/update/:id', updateUserById);     // Update user by ID
router.delete('/delete/:id', deleteUserById);  // Delete user by ID
router.post('/create', createUser);             // Create new user

export default router;