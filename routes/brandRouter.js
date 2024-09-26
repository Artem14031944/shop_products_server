import { Router } from 'express';
import BrandController from '../controllers/brandController.js';

const router = new Router();

router.get('/get_all', BrandController.getAll);
router.get('/get_one', BrandController.getOne)
router.post('/create', BrandController.create);
router.patch('/update', BrandController.update);
router.delete('/delete', BrandController.delete);

export default router;