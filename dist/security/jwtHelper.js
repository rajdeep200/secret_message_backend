import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET_KEY;
export const generateToken = (payload) => {
    // console.log('payload ==>> ', payload)
    // console.log('secretKey generateToken ==>> ', `${secretKey}`)
    const token = jwt.sign({ payload }, secretKey, { expiresIn: "3d" });
    return token;
};
export const verifyToken = (token) => {
    try {
        // console.log('secretKey verifyToken ==>> ', secretKey)
        const verificationResponse = jwt.verify(token, secretKey);
        // console.log('verificationResponse ==>> ', verificationResponse)
        // console.log('secretKey verifyToken ==>> ', secretKey)
        return verificationResponse;
    }
    catch (error) {
        console.log('error ==>> ', error);
        return null;
    }
};
//# sourceMappingURL=jwtHelper.js.map