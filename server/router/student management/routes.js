import express from "express";
import {
    getAllStudents,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser
} from '../../controllers/student management/controller.js';

const router = express.Router();

router.get('/', getAllStudents);
router.get('/profile', getAllStudents);
router.get('/getUser/:id', getUserById);
router.put('/updateUser/:id', updateUserById);
router.delete('/deleteUser/:id', deleteUserById);
router.post('/createUser', createUser);

export default router;
