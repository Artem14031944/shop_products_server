import { Type } from '../models/models.js';
import ApiError from '../err/ApiError.js';

const MessageUpdateSuccess = 'Тип успешно изменен';
const MessageDeleteSuccess = 'Тип успешно удален';

class TypeController {
    async create(req, res) {
        const { name } = req.body;
        const type = await Type.create({ name });

        return res.json(type);
    }

    async get(req, res) {
        const allTypes = await Type.findAll();

        return res.json(allTypes);
    }

    async update(req, res) {
        const type = req.body;
        await Type.update(type, { where: { id: type.id }});

        return res.json({ message: MessageUpdateSuccess });
    }

    async delete(req, res) {
        const { id } = req.query;
        const typeDeleted = await Type.destroy({ where: { id } });

        return res.json({ message: MessageDeleteSuccess });
    }
}

export default new TypeController();