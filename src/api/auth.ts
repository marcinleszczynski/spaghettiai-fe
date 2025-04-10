import {Client} from "./client.ts";

export interface IUserToken {
    token: string;
}

export interface IUserLoginRequest {
    email: string;
    password: string;
}

export interface IUserRegistrationRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export const login = (email: string, password: string) => {
    return Client.post<IUserToken, IUserLoginRequest>("/auth/login", {email, password});
}

export const register = (dto: IUserRegistrationRequest) => {
    return Client.post<null, IUserRegistrationRequest>("/auth/register", dto);
}

export const activate = (code: string) => {
    return Client.put<null, null>(`/auth/activate?code=${code}`, null);
}