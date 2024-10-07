import { generateJWT } from "../helpers/generateJWT.js";
import { validationResult } from "express-validator";
import UserService from "../services/userService.js"
import ApiError from "../err/ApiError.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }
            
            const { email, password, role } = req.body;
            const token = await UserService.registration(email, password, role);

            return res.json({ token });
        } catch (err) {
            next(err);
        }
    }
    
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }
            const { email, password } = req.body;
            const token = await UserService.login(email, password);
    
            return res.json({ token });      
        } catch(err) {
            next(err);
        } 
    }

    async check(req, res, next) {
        const { user } = req;
        const token = generateJWT(user);

        return res.json({ token });
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }

            const user = req.body;

            const message = await UserService.update(user);
    
            return res.json(message);
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(errors.array().map(err => err.msg).join('\n')));
            }

            const { id } = req.query;

            const message = await UserService.delete(id);
    
            return res.json(message);
        } catch(err) {
            next(err);
        }
    }
}

export default new UserController();