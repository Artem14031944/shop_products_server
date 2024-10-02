import ApiError from "../err/ApiError.js";
import { User, Basket } from "../models/models.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/generateJWT.js";
import { listMessagesErrors } from "../helpers/listMessages.js";

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest(listMessagesErrors['incorrectEmailOrPasswrod']));
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest(listMessagesErrors['userExists']));
        }

        const hasPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ email, password: hasPassword, role });
        const basket = await Basket.create({ userId: user.id });
        const token = generateJWT(user);

        return res.json({ token });
    }
    
    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal(listMessagesErrors['notFoundUser']));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal(listMessagesErrors['incorrectPassword']));
        }

        const token = generateJWT(user);

        return res.json({ token })
    }

    async check(req, res, next) {
        const { user } = req;
        const token = generateJWT(user);

        return res.json({ token });
    }

    async update(req, res) {}

    async deleteAccount(req, res) {}
}

export default new UserController();