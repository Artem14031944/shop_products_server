import { Brand } from "../models/models.js";
import { validationResult } from "express-validator";
import BrandService from "../services/brandService.js";
import ApiError from "../err/ApiError.js";

class BrandController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }
    
            const brand = req.body;
            const newBrand = await BrandService.create(brand);
    
            return res.json(newBrand);
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }
    
            const brand = req.body;
            const message = await BrandService.update(brand);
    
            return res.json(message);
        } catch(err) {
            next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }
    
            const { id } = req.body;
            const brand = await BrandService.getOne(id);
    
            return res.json(brand);
        } catch(err) {
            next(err);
        }
    }

    async getAll(req, res) {
        const allBrans = await Brand.findAll();

        return res.json(allBrans);
    }

    async delete(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }
            
            const { id } = req.query;
            const message = await BrandService.delete(id);
    
            return res.json(message);
        } catch(err) {
            next(err);
        } 
    }
}

export default new BrandController();