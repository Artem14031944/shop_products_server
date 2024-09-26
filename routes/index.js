import { Router } from 'express';
import TypeRouter from "./typeRouter.js";
import UserRouter from "./userRouter.js";
import DeviceRouter from "./deviceRouter.js";
import BrandRouter from "./brandRouter.js";

const router = new Router();

router.use('/user', UserRouter);
router.use('/type', TypeRouter);
router.use('/brand', BrandRouter);
router.use('/device', DeviceRouter);

export default router;