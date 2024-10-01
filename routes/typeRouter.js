import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import CheckMiddleware from "../middleware/CheckMiddleware.js";
 
const router = new Router();
const roleAdmin = 'ADMIN';

router.get('/get', TypeController.get);
router.post('/create', CheckMiddleware(roleAdmin), TypeController.create);
router.patch('/update', TypeController.update);
router.delete('/delete', TypeController.delete);

export default router;