import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import CheckMiddleware from "../middleware/CheckMiddleware.js";
import { validateTypeName, validateTypeId } from "../validators/typeValidate.js";
 
const router = new Router();
const roleAdmin = 'ADMIN';

router.get('/get_all', TypeController.getAll);
// router.post('/create', CheckMiddleware(roleAdmin), TypeController.create);
router.post('/create', TypeController.create);
router.patch('/update', validateTypeId, TypeController.update);
router.delete('/delete', validateTypeId, TypeController.delete);

export default router;