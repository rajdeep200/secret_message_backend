export default class CustomResponse<T> {
    private success: boolean;
    private data?: T;
    private message?: string;

    constructor(success: boolean, data?: T, message?: string) {
        this.success = success
        this.data = data
        this.message = message
    }
}