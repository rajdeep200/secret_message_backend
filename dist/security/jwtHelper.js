import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY;
export const generateToken = (payload) => {
    return jwt.sign({ payload }, secretKey, { expiresIn: "3d" });
};
export const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};
//# sourceMappingURL=jwtHelper.js.map