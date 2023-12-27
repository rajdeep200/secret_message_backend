import { Request, Response, Next } from "express";
import { verifyToken } from "../security/jwtHelper.js";

export const authenticate = (req: Request, res: Response, next: Next) => {
    let token: any;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);
            if (!decoded) {
                res.status(401).send(decoded)
                return
            }
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

export const validateToken = (req: Request, res: Response, next: Next) => {
    try {
        const { username }: any = req.query;
        let trimmedToken = req.headers.authorization.split(" ")[1];
        const decoded = verifyToken(trimmedToken)
        const { payload } = decoded
        if(payload.username === username){
            next()
        }else {
            res.status(401).send("Unauthorized")
            return; 
        }
        return payload.username === username;
    } catch (error) {
        res.status(401).send(error)
        return;
    }
}