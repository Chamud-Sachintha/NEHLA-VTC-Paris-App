import { Client } from "./client";

export class Authenticate {
    code!: number;
    message!: string;
    data = new Client();
    token!: string;
}
