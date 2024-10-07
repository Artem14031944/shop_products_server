import TypeService from "../services/typeService.js";
import { validationResult } from "express-validator";
import ApiError from "../err/ApiError.js";

class TypeController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }

            const { name } = req.body;
            const type = await TypeService.create(name);
    
            return res.json(type);
        } catch(err) {
            next(err);
        }
    }

    async getAll(req, res) {
        const types = await TypeService.getAll();

        return res.json(types);
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }

            const type = req.body;
            const message =  await TypeService.update(type);
    
            return res.json(message);
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.query;
            const message = await TypeService.delete(id);
    
            return res.json(message);
        } catch (err) {
            next(err);
        }
    }
}

export default new TypeController();
