import jsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJWT = user => jsonWebToken.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' },
);

export {
    generateJWT,
}