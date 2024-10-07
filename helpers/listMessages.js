const listMessagesSusses = {
    delete: 'Успешно удалено',
    change: 'Успешно изменено'
};

const listMessagesErrors = {
    id: 'Не указано id',
    name: 'Не указано названия',
    incorrectEmail: 'Некорректный email',
    unauthorized: 'Не авторизован',
    serverError: 'Ошибка сервера',
    noAccess: 'Нет доступа',
    dublicat: 'Такое уже есть',
    notFound: 'Не найдено',
    notFoundId: 'Нет такого id',
    userExists: 'Пользователь с таким email уже существует',
    notFoundUser: 'Пользователь не найден',
    incorrectPassword: 'Неверный пароль',
    incorrectEmailOrPasswrod: 'Некорректный email или пароль',
    lengthPassword: 'Пароль должен составлять не менее 5 символов',
    requiredPassword: 'Введите пароль',
    requiredEmail: 'Введите email',
};

export {
    listMessagesSusses,
    listMessagesErrors,
};
