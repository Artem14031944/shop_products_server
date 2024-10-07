import { body, check } from "express-validator";

const validateNotEmptyField = (field, message) => check(field)
    .trim()
    .not()
    .isEmpty()
    .withMessage(message);

const validateEmailField = (field, message) => check(field)
    .trim()
    .isEmail()
    .withMessage(message);

const validateLengthField = (field, message, min) => check(field)
    .if(body(field).exists())
    .trim()
    .isLength({ min })
    .withMessage(message);

export {
    validateNotEmptyField,
    validateEmailField,
    validateLengthField,
};
