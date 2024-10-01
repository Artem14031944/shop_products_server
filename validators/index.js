import { body, check } from "express-validator";

const validateNotEmptyField = (field, message) => check(field).trim().exists().not().isEmpty().withMessage(message);

export {
    validateNotEmptyField
}