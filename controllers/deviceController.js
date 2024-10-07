import { Device } from "../models/models.js";
import { __dirname } from "../helpers/path.js";
import DeviceService from "../services/deviceService.js";
import { validationResult } from "express-validator";
import ApiError from "../err/ApiError.js";

class DeviceController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }
      
            const data = req.body;
            const { img } = req.files;
            const device = await DeviceService.create(data, img);

            return res.json(device);
        } catch(err) {
            next(ApiError.badRequest(err.messgae));
        }
    }

    async getAll(req, res) {
        // let { brandId, typeId, limit, page } = req.query;
        // page = +page || 1;
        // limit = +limit || 9;
        // let offset = page * limit - limit;
        // let devices;

        // if (!brandId && !typeId) {
        //     devices = await Device.findAndCountAll({ limit, offset });
        // } else if (brandId && !typeId) {
        //     devices = await Device.findAndCountAll({ where: { brandId }, limit , offset });
        // } else if (!brandId && typeId) {
        //     devices = await Device.findAndCountAll({ where: { typeId }, limit , offset });
        // } else if (brandId && typeId) {
        //     devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit , offset });
        // }

        const query = req.query;
        const devices = await DeviceService.getAll(query);

        return res.json(devices);
    }

    async getOne(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }

            const { id } = req.params;
       
            const device = await DeviceService.getOne(id);
    
            return res.json(device);
        } catch(err) {
            next(ApiError.badRequest(err.messgae));
        }
    }

    async update(req, res) {}

    async delete(req, res) {}
}

export default new DeviceController();