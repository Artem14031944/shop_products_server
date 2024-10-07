import { Router } from "express";
import { validateBrandName, validateBrandId } from "../validators/brandValidate.js"
import BrandController from "../controllers/brandController.js";

const router = new Router();

router.get('/get_all', BrandController.getAll);
router.post('/get_one', validateBrandId, BrandController.getOne);
router.post('/create', validateBrandName, BrandController.create);
router.patch('/update', validateBrandId, BrandController.update);
router.delete('/delete', validateBrandId, BrandController.delete);

export default router;
