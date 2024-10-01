import { Router } from "express";
import DeviceController from "../controllers/deviceController.js";
// import { deviceCreateValidate, deviceUpdateValidate, deviceDeleteValidate } from "./validate/deviceValidate.js";

const router = new Router();

router.post('/create', DeviceController.create);
router.get('/get_all', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);
router.patch('/update', DeviceController.update);
router.delete('/delete', DeviceController.delete);

export default router;