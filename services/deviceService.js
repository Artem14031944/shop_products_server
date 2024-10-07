import { listMessagesErrors, listMessagesSusses } from "../helpers/listMessages.js";
import { Device, DeviceInfo } from "../models/models.js";
import { __dirname } from "../helpers/path.js";
import ApiError from "../err/ApiError.js";
import { resolve } from "path";
import { v4 } from "uuid";
 
class DeviceService {
    async create(data, img) {
        let { name, price, brandId, typeId, info } = data;
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

        return device;
    }

    async getAll(query) {
        let { brandId, typeId, limit, page } = query;
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

        return devices;
    }

    async getOne(id) {
        const idDevice = await this._checkDeviceId(id);
        if (!idDevice) {
            throw ApiError.badRequest(listMessagesErrors['notFoundId']);
        }

        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }],
            }
        );

        return device;
    }

    async update() {}

    async delete() {}

    async _checkDeviceId(id) {
        const isDevice = await Device.findOne({ where: { id }});

        return isDevice;
    }
}

export default new DeviceService();
