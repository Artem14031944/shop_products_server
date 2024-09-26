import { Router } from 'express';
import TypeController from '../controllers/typeController.js';
 
const router = new Router();

router.get('/get', TypeController.get);
router.post('/create', TypeController.create);
router.patch('/update', TypeController.update);
router.delete('/delete', TypeController.delete);

export default router;