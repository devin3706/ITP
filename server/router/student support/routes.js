import express from 'express';
import mainController from '../../controllers/student support/controller.js';

const router = express.Router();

router.get('/', mainController.getAllUsers);
router.get('/getUser/:id', mainController.getUserById);
router.put('/updateUser/:id', mainController.updateUserById);
router.delete('/deleteUser/:id', mainController.deleteUserById);
router.post('/CreateUser', mainController.createUser);
router.post('/Questions', mainController.postQuestion);
router.get('/getQuestionsForTeacher/:teacherName', mainController.getQuestionsForTeacher);

export default router;
