import { Brand } from '../models/models.js'

const messageUpdateSuccess = 'Бранд успешно изменен';
const messageDeleteSuccess = 'Бранд успешно удален';

class BrandController {
    async create(req, res) {
        const brand = req.body;
        const newBrand = await Brand.create(brand);

        return json(newBrand);
    }

    async update(req, res) {
        const brand = req.body;
        await Brand.update(brand, { where: { id : brand.id }});

        return res.json({ message: messageUpdateSuccess });
    }

    async getOne(req, res) {
        const { id } = req.body;
        const brand = await Brand.findAll({ where: { id } });

        return res.json(brand);
    }

    async getAll(req, res) {
        const allBrans = await Brand.findAll();

        return res.json(allBrans);
    }

    async delete(req, res) {
        await Brand.destroy({ where: { id } });

        return res.json({ message: messageDeleteSuccess });
    }
}

export default new BrandController();