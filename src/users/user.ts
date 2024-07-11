export class User {
    private _userId: number;
    private _username: string;

    constructor(userId: number, username: string){
        this._userId = userId;
        this._username = username;
    }

    public get userId(): number {
        return this.userId;
    }

    public get username(): string {
        return this.username;
    }
}
