export const generateUsername = (name, length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return name.substring(0, 2) + randomString;
};
// export const generateId = () : string => {
//     return uuidv4();
// }
export const generateId = () => {
    const min = 1000000000;
    const max = 9999999999;
    const generatedId = Math.floor(Math.random() * (max - min + 1)) + min;
    return generatedId;
};
//# sourceMappingURL=functions.js.map