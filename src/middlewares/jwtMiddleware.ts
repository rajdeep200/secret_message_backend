import { Request, Response, Next } from "express";
import { verifyToken } from "../security/jwtHelper.js";

export const authenticate = (req: Request, res: Response, next: Next) => {
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        res.sendStatus(401)
    }

    const decodedToken = verifyToken(token)
    console.log('decodedToken ==>> ', decodedToken)
    if(!decodedToken) {
        res.sendStatus(401)
    }
    req.user = decodedToken
    next()
}