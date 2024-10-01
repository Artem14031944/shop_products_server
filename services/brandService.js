import { Brand } from "../models/models.js";
import ApiError from "../err/ApiError.js";

const messagaeDublicat = 'Такой бренд уже есть';
const messsageNotId = 'Нет бренда с таким id';
const messageUpdateSuccess = 'Бренд изменен';
const messageDeleteSuccess = 'Бренд удален';

class BrandService {
    async create(brand) {
        const isHasBrand = await Brand.findOne({ where: { name: brand.name } });
        if (isHasBrand) {
            throw ApiError.badRequest(messagaeDublicat);
        }

        const newBrand = await Brand.create(brand);

        return newBrand;
    }

    async update(brand) {
        const isHasBrand = await Brand.findOne({ where: { id: brand.id } });
        if (!isHasBrand) {
            throw ApiError.badRequest(messsageNotId);
        }

        await Brand.update(brand, { where: { id : brand.id }});

        return { message: messageUpdateSuccess };
    }

    async getOne(id) {
        const isHasBrand = await Brand.findOne({ where: { id: brand.id } });
        if (!isHasBrand) {
            throw ApiError.badRequest(messsageNotId);
        }
        const brand = await Brand.findAll({ where: { id } });

        return brand;
    }

    async delete(id) {
        const isHasBrand = await Brand.findOne({ where: { id } });
        if (!isHasBrand) {
            throw ApiError.badRequest(messsageNotId);
        }

        await Brand.destroy({ where: { id } });

        return { message: messageDeleteSuccess };
    }
}

export default new BrandService();