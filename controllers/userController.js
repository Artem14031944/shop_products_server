import ApiError from "../err/ApiError.js";

class UserController {
    async registration(req, res) {

    }
    
    async login(req, res) {}

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badReques('Не указан id'));
        }
        res.json(id);
    }

    async update(req, res) {}

    async deleteAccount(req, res) {}
}

export default new UserController();