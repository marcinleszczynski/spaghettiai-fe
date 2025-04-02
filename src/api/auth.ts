import {Client} from "./client.ts";

export interface IUserToken {
    token: string;
}

export interface IUserLoginRequest {
    email: string;
    password: string;
}

export const login = (email: string, password: string) => {
    return Client.post<IUserToken, IUserLoginRequest>("/auth/login", {email, password});
}