var _a;
import { getReq, postReq } from "../utils/db.js";
import { postgresDatabase } from "../config/config.js";
import CustomResponse from "../utils/customResponse.js";
import { decryptPassword, encryptPassword, generateId, generatePassword, generateUsername, verifyPassword } from "../utils/functions.js";
import { RegisterPayload } from "../utils/payloads.js";
import { generateToken } from "../security/jwtHelper.js";
export class UserController {
}
_a = UserController;
UserController.getAllUsers = async (req, res) => {
    try {
        const query = "SELECT * FROM users";
        const response = await getReq(query, postgresDatabase);
        const customResponse = new CustomResponse(true, response, "Successfully retrieved from DB");
        res.status(200).json(customResponse);
    }
    catch (error) {
        console.log('error', error);
        const customResponse = new CustomResponse(false, "Something went wrong");
        res.status(500).json(customResponse);
    }
};
UserController.getAllUserByUsername = async (req, res) => {
    try {
        const { username } = req.query;
        const query = `SELECT * FROM users WHERE username = '${username}'`;
        const response = await getReq(query, postgresDatabase);
        const customResponse = new CustomResponse(true, response, "Successfully retrieved from DB");
        res.status(200).json(customResponse);
    }
    catch (error) {
        console.log('error', error);
        const customResponse = new CustomResponse(false, "Something went wrong");
        res.status(500).json(customResponse);
    }
};
UserController.register = async (req, res) => {
    const generatedUsername = generateUsername(req.body.name, 8);
    const generatedId = generateId();
    if (req.body.password && !verifyPassword(req.body.password)) {
        const customResponse = new CustomResponse(true, undefined, "Password format is wrong");
        res.status(500).json(customResponse);
        return;
    }
    const generatedPassword = generatePassword();
    const encryptedPassword = encryptPassword(generatedPassword);
    const payloadObj = new RegisterPayload(generatedId, req.body.name, generatedUsername, req.body.email, encryptedPassword);
    const payload = Object.values(payloadObj);
    try {
        const query = {
            name: 'register',
            text: 'INSERT INTO "users" (id, name, username, email, password) values ($1, $2, $3, $4, $5)',
            values: payload
        };
        await postReq(query, postgresDatabase);
        const generatedToken = generateToken({ id: generatedId, username: generatedUsername });
        const customResponse = new CustomResponse(true, undefined, "User Registered Successfully", generatedToken);
        res.status(200).json(customResponse);
    }
    catch (error) {
        console.log('error', error);
        const customResponse = new CustomResponse(false, "Something went wrong");
        res.status(500).json(customResponse);
    }
};
// username => RaQqjgLyft
// password => AZx9qazh2s
// username2 => RaJvukX6zB
UserController.login = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        const customResponse = new CustomResponse(false, "Bad Request");
        res.status(400).json(customResponse);
        return;
    }
    const { username, password } = req.body;
    try {
        const getUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
        const userResult = await getReq(getUserQuery, postgresDatabase);
        if (userResult.length === 0) {
            const customResponse = new CustomResponse(false, 'User not found');
            return res.status(401).json(customResponse);
        }
        const encryptedPassword = userResult[0].password;
        const decryptedPasword = decryptPassword(encryptedPassword);
        if (decryptedPasword !== password) {
            const customResponse = new CustomResponse(false, 'Invalid password');
            return res.status(401).json(customResponse);
        }
        userResult[0].password = decryptedPasword;
        const generatedToken = generateToken({ id: userResult[0].id, username: userResult[0].username });
        const customResponse = new CustomResponse(true, userResult[0], "User LoggedIn Successfully", generatedToken);
        res.status(200).json(customResponse);
    }
    catch (error) {
        console.log('error', error);
        const customResponse = new CustomResponse(false, "Something went wrong");
        res.status(500).json(customResponse);
    }
};
UserController.update = async (req, res) => {
    try {
    }
    catch (error) {
        console.log('error', error);
        const customResponse = new CustomResponse(false, "Something went wrong");
        res.status(500).json(customResponse);
    }
};
//# sourceMappingURL=userController.js.map