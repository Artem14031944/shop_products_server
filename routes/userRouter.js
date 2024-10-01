import { Router } from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { query } from "express-validator";

const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', AuthMiddleware, UserController.check);

export default router;