import { Type } from "../models/models.js";
import ApiError from "../err/ApiError.js";
import { listMessagesErrors, listMessagesSusses } from "../helpers/listMessages.js";

class TypeService {
    async create(name) {
        if (!name) {
            throw ApiError.badRequest(listMessagesErrors['name']);
        }

        const type = await Type.create({ name });

        return type;
    }

    async update(type) {
        if (!type) {
            throw ApiError.badRequest(listMessagesErrors['notFind']);
        }

        const isType = await this._checkTypeId(type.id);
        if (!isType) {
            throw ApiError.badRequest(listMessagesErrors['notFind']);
        }

        await Type.update(type, { where: { id: type.id }});

        return { message: listMessagesSusses['change'] };
    }

    async delete(id) {
        const isType = await this._checkTypeId(id);
        if (!isType) {
            throw ApiError.badRequest(listMessagesErrors['notFind']);
        }

        await Type.destroy({ where: { id } });

        return { message: listMessagesSusses['delete'] };
    }

    async _checkTypeId(id) {
        const isType = await Type.findOne({ where: { id } });
        
        return isType;
    }
}

export default new TypeService();
