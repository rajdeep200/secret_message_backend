export class RegisterPayload<T> {

    private id: number;
    private name: string;
    private email: string;
    private password: string;
    private username: string;

    public constructor(id: number, name: string, email: string, password: string, username: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.username = username;
    }
}