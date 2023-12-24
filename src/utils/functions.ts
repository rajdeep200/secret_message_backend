import Crypto from 'crypto'

export const generateUsername = (name: string, length: number): string => {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return name.substring(0, 2) + randomString;
}

export const generateId = (): number => {
    const min: number = 1000000000;
    const max: number = 9999999999;
    const generatedId: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return generatedId;
}

export const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}

export const verifyPassword = (password: string): boolean => {
    const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regexPattern.test(password);
}

const algorithm = 'aes-256-gcm';
const secretKey = "mypasswith32chars>>AES_256_bytes";
const ivLength = 16;
const tagLength = 16;
const encoding = 'hex';
const saltLength = 64;
const pbkdf2Iterations = 100000;

const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;

const getKey = (salt: any) => {
    return Crypto.pbkdf2Sync(secretKey,salt, pbkdf2Iterations, 32, 'sha512')
}

export const encryptPassword = (password: string) => {
    const iv = Crypto.randomBytes(ivLength);
    const salt = Crypto.randomBytes(saltLength);
    const key = getKey(salt)
    const cipher = Crypto.createCipheriv(algorithm, key, iv)
    const encrypted = Buffer.concat([cipher.update(password, 'utf-8'), cipher.final()])
    const tag = cipher.getAuthTag()
    return Buffer.concat([salt, iv, tag, encrypted]).toString(encoding)
}

export const decryptPassword = (encryptedPassword: any) => {
    const strValue: Buffer = Buffer.from(encryptedPassword, encoding)
    const salt = strValue.subarray(0, saltLength)
    const iv = strValue.subarray(saltLength, tagPosition)
    const tag = strValue.subarray(tagPosition, encryptedPosition);
    const encrypted = strValue.subarray(encryptedPosition)
    const key = getKey(salt);
    const decipher = Crypto.createDecipheriv(algorithm, key, iv)
    decipher.setAuthTag(tag);
    return decipher.update(encrypted) + decipher.final('utf-8');
}