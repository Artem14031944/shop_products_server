import {
    validateEmailField,
    validateLengthField,
    validateNotEmptyField,
} from "./index.js";
import { listMessagesErrors } from "../helpers/listMessages.js";

const validateUserRegistration = Object.values({
    email: validateEmailField('email', listMessagesErrors['incorrectEmail']),
    password: validateLengthField('password', listMessagesErrors['lengthPassword'], 5),
});

const validateUserLogin = Object.values({
    email: validateNotEmptyField('email', listMessagesErrors['requiredEmail']),
    password: validateNotEmptyField('password', listMessagesErrors['requiredPassword']),
});

const validateUserUpdate = Object.values({
    id: validateNotEmptyField('id', listMessagesErrors['id']),
    email: validateEmailField('email', listMessagesErrors['incorrectEmail']),
    password: validateLengthField('password', listMessagesErrors['lengthPassword'], 5),
});

const validateUserId = Object.values({
    id: validateNotEmptyField('id', listMessagesErrors['id']),
});

export {
    validateUserRegistration,
    validateUserLogin,
    validateUserUpdate,
    validateUserId,
};
