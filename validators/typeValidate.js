import { query } from "express-validator";

const validateType = () => query('name').notEmpty();

export {
    validateType,
};