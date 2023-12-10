import { Request, Response } from "express";
import { User } from "../models/User.js";
import { getReq, postReq } from "../utils/db.js";
import { postgresDatabase } from "../config/config.js";
import CustomResponse from "../utils/customResponse.js";

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
        const payload = Object.values(req.body)
        try {
            const query = {
                name: 'register',
                text: 'INSERT INTO "users" (id, name, username, email, password) values ($1, $2, $3, $4, $5)',
                values: payload
            }
            await postReq(query, postgresDatabase)
            const customResponse = new CustomResponse(true, "User Registered Successfully")
            res.status(200).json(customResponse)
        } catch (error) {
            console.log('error', error)
            const customResponse = new CustomResponse(false, "Something went wrong")
            res.status(500).json(customResponse)
        }
    }
}