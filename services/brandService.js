import { Brand } from "../models/models.js";
import ApiError from "../err/ApiError.js";
import { listMessagesSusses, listMessagesErrors } from "../helpers/listMessages.js";

class BrandService {
    async create(brand) {
        const isBrand = await Brand.findOne({ where: { name: brand.name } });
        if (isBrand) {
            throw ApiError.badRequest(listMessagesErrors['dublicat']);
        }

        const newBrand = await Brand.create(brand);

        return newBrand;
    }

    async getAll() {
        const brands = await Brand.findAll();

        return brands;
    }

    async update(brand) {
        const isBrand = await this._checkBrandId(brand.id);
        if (!isBrand) {
            throw ApiError.badRequest(listMessagesErrors['notFoundId']);
        }

        await Brand.update(brand, { where: { id : brand.id }});

        return { message: listMessagesSusses['change'] };
    }

    async getOne(id) {
        const isBrand = await this._checkBrandId(id);
        if (!isBrand) {
            throw ApiError.badRequest(listMessagesErrors['notFoundId']);
        }

        const brand = await Brand.findAll({ where: { id } });

        return brand;
    }

    async delete(id) {
        const isBrand = await this._checkBrandId(id);
        if (!isBrand) {
            throw ApiError.badRequest(listMessagesErrors['notFoundId']);
        }

        await Brand.destroy({ where: { id } });

        return { message: listMessagesSusses['delete'] };
    }

    async _checkBrandId(id) {
        const isBrand = await Brand.findOne({ where: { id } });
        
        return isBrand;
    }
}

export default new BrandService();
