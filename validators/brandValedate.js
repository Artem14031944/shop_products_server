import { validateNotEmptyField } from "./index.js";

const messageNotName = 'Не указано названия';
const messageNotId = 'Не указано id';

const validateBrandName = Object.values({
    name: validateNotEmptyField('name', messageNotName),
});

const validateBrandId = Object.values({
    id: validateNotEmptyField('id', messageNotId),
});

export {
    validateBrandName,
    validateBrandId,
}