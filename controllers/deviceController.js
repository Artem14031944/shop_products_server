import { Device, DeviceInfo } from '../models/models.js';
import { __dirname } from '../helper/path.js'
import { v4 } from 'uuid';
import { resolve } from 'path';
import ApiError from '../err/ApiError.js';

class DeviceController {
    async create(req, res, next) {
        // try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            let filename = v4() + ".jpg";
            img.mv(resolve(__dirname, '.', 'static', filename));

            const device = await Device.create({ name, price, brandId, typeId, info, imgUrl: filename });

            
            if (info) {
                info = JSON.parse(info);
                info.forEach(i => 
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id,
                    })
                );
            }
            
            return res.json(device);
        // } catch(err) {
        //     next(ApiError.badRequest(err.messgae));
        // }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = +page || 1;
        limit = +limit || 9;
        let offset = page * limit - limit;
        let devices;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        } else if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit , offset });
        } else if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit , offset });
        } else if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit , offset });
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne(
            { 
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }],
            }
        );

        return res.json(device);
    }

    async update(req, res) {}

    async delete(req, res) {}
}

export default new DeviceController();