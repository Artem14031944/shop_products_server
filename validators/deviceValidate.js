import { query } from "express-validator";

// TODO не хватает полей
const deviceCreateValidate = () => query('name').notEmpty;
const deviceUpdateValidate = () => query('name').notEmpty;
const deviceDeleteValidate = () => query('id').notEmpty;

export {
    deviceCreateValidate,
    deviceUpdateValidate,
    deviceDeleteValidate,
}