import { v4 as uuidv4 } from "uuid";

export const generateUsername = (name: string, length: number): string => {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return name.substring(0,2) + randomString;
}

// export const generateId = () : string => {
//     return uuidv4();
// }

export const generateId = (): number => {
    const min : number = 1000000000;
    const max : number = 9999999999;
    const generatedId : number = Math.floor(Math.random() * (max - min + 1)) + min;
    return generatedId;
}