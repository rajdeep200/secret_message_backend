import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY;
export const generateToken = (payload) => {
    return jwt.sign({ payload }, secretKey, { expiresIn: "3d" });
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    }
    catch (error) {
        console.log('error ==>> ', error);
        return null;
    }
};
//# sourceMappingURL=jwtHelper.js.map