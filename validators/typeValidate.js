import { validateNotEmptyField } from "./index.js";
import { listMessagesErrors } from "../helpers/listMessages.js";

const validateTypeName = Object.values({
    name: validateNotEmptyField('name', listMessagesErrors['name']),
});

const validateTypeId = Object.values({
    id: validateNotEmptyField('id', listMessagesErrors['id']),
});

export {
    validateTypeName,
    validateTypeId,
};