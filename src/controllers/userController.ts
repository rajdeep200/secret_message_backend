import { Request, Response } from "express";
import { User } from "../models/User.js";
import { getReq, postReq } from "../utils/db.js";
import { postgresDatabase } from "../config/config.js";
import CustomResponse from "../utils/customResponse.js";
import { generateId, generateUsername } from "../utils/functions.js";
import { RegisterPayload } from "../utils/payloads.js";
import { generateToken } from "../security/jwtHelper.js";

export class UserController {
    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const query = "SELECT * FROM users"
            const response = await getReq(query, postgresDatabase)
            const customResponse = new CustomResponse(true, response, "Successfully retrieved from DB")
            res.status(200).json(customResponse)
        } catch (error) {
            console.log('error', error)
            const customResponse = new CustomResponse(false, "Something went wrong")
            res.status(500).json(customResponse)
        }
    }

    static register = async (req: Request, res: Response) => {
        const generatedUsername = generateUsername(req.body.name, 8);
        const generatedId = generateId();
        const payloadObj = new RegisterPayload(generatedId, req.body.name, generatedUsername, req.body.email, req.body.password)
        const payload = Object.values(payloadObj)
        try {
            const query = {
                name: 'register',
                text: 'INSERT INTO "users" (id, name, username, email, password) values ($1, $2, $3, $4, $5)',
                values: payload
            }
            await postReq(query, postgresDatabase)
            const generatedToken = generateToken({id: generatedId, username: generatedUsername, email: req.body.email})
            const customResponse = new CustomResponse(true, undefined, "User Registered Successfully", generatedToken)
            res.status(200).json(customResponse)
        } catch (error) {
            console.log('error', error)
            const customResponse = new CustomResponse(false, "Something went wrong")
            res.status(500).json(customResponse)
        }
    }
}