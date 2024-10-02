import { validateNotEmptyField } from "./index.js";
import { listMessagesErrors } from "../helpers/listMessages.js";

const validateBrandName = Object.values({
    name: validateNotEmptyField('name', listMessagesErrors['name']),
});

const validateBrandId = Object.values({
    id: validateNotEmptyField('id', listMessagesErrors['id']),
});

export {
    validateBrandName,
    validateBrandId,
}