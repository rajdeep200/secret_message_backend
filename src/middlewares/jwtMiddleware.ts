import { Request, Response, Next } from "express";
import { verifyToken } from "../security/jwtHelper.js";

export const authenticate = (req: Request, res: Response, next: Next) => {
    let token: any;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);
            console.log(decoded)
            next()
        } catch (error) {
            console.error(error);
            res.status(401).send(error)
            return
        }
    }

    if (!token) {
        res.status(401).json({ error: "No Token" });
        return;
    }
}