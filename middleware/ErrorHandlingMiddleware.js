import AppError from '../err/ApiError.js';

export default function(err, reg, res, next) {
    if (err instanceof AppError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка' })
}