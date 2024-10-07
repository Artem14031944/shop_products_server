import { Router } from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import {
    validateUserRegistration,
    validateUserLogin,
    validateUserId,
    validateUserUpdate,
} from "../validators/userValidate.js";

const router = new Router();

router.post('/registration', validateUserRegistration, UserController.registration);
router.post('/login', validateUserLogin, UserController.login);
router.get('/auth', AuthMiddleware, UserController.check);
router.patch('/update', validateUserUpdate, UserController.update);
router.delete('/delete', validateUserId, UserController.delete);

export default router;