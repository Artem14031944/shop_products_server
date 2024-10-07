import { listMessagesErrors, listMessagesSusses } from "../helpers/listMessages.js";
import { generateJWT } from "../helpers/generateJWT.js";
import { User, Basket } from "../models/models.js";
import ApiError from "../err/ApiError.js";
import bcrypt from "bcrypt";

class UserService {
    async registration(email, password, role) {
        if (!email || !password) {
            throw ApiError.badRequest(listMessagesErrors['incorrectEmailOrPasswrod']);
        }

        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.badRequest(listMessagesErrors['userExists']);
        }

        const hasPassword = await bcrypt.hash(password, 8);
        if (!hasPassword) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        }

        const user = await User.create({ email, password: hasPassword, role });
        if (!user) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        }

        const basket = await Basket.create({ userId: user.id });
        if (!basket) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        }

        const token = generateJWT(user);
        if (!token) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        }

        return token;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.badRequest(listMessagesErrors['notFoundUser']);
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            throw ApiError.badRequest(listMessagesErrors['incorrectPassword']);
        }

        const token = generateJWT(user);
        if (!token) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        }

        return token;
    }

    async update(user) {
        const isUser = await this._checkUserId(user.id);
        if (!isUser) {
            throw ApiError.badRequest(listMessagesErrors['notFoundId']);
        }

        let userData = user;

        if (userData.password) {
            userData.password = await bcrypt.hash(user.password, 8);
        }

        const updatedUser = await User.update(userData, { where: { id: user.id } });
        if (!updatedUser) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        } 

        return { message: listMessagesSusses['change'] };
    }
 
    async delete(id) {
        const isUser = await this._checkUserId(id);
        if (!isUser) {
            throw ApiError.badRequest(listMessagesErrors['notFoundId']);
        }

        const isDeleteBasket = await Basket.destroy({ where: { userId: id } });
        if (!isDeleteBasket) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        }

        const isDeleteUser = await User.destroy({ where: { id }});
        if (!isDeleteUser) {
            throw ApiError.internal(listMessagesErrors['serverError']);
        }

        return { message: listMessagesSusses['delete'] };
    }

    async _checkUserId(id) {
        const isUser = await User.findOne({ where: { id }});

        return isUser;
    }
}

export default new UserService();
