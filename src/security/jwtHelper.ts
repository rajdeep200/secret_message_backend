import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET_KEY

export const generateToken = (payload: any): string => {
    return jwt.sign({ payload }, secretKey, {expiresIn: "3d"});
}

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        console.log('error ==>> ', error)
        return null
    }
}