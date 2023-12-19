export default class CustomResponse<T> {
    private success: boolean;
    private data?: T;
    private message?: string;
    private token?: string;

    constructor(success: boolean, data?: T, message?: string, token?: string) {
        this.success = success
        this.data = data
        this.message = message
        this.token = token
    }
}