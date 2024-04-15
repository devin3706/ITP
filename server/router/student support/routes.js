import express from 'express';
const router = express.Router();
import UserController from '../../controllers/student support/controller.js';

router.get('/', UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUserById);
router.put('/updateUser/:id', UserController.updateUser);
router.delete('/deleteUser/:id', UserController.deleteUser);
router.post('/createUser', UserController.createUser);

export default router;