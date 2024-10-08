import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";
import { listMessagesErrors } from "../helpers/listMessages.js";

dotenv.config();

export default function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: listMessagesErrors['unauthorized'] });
        }

        const decode = jsonWebToken.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch(err) {
        res.status(401).json({ message: listMessagesErrors['unauthorized'] });
    }
};