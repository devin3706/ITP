import {Router} from "express";
const router = Router();

//import controllers
import * as controller from '../../controllers/exam/controller.js';

//Questions Routes API

router.route('/questions')
    .get(controller.getQuestions) //get request
    .post(controller.insertQuestions) //post request
    .delete(controller.dropQuestions) //delete request

router.route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .put(controller.updateResult)
    .delete(controller.dropResult)

export default router;
