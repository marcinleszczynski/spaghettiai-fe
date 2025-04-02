import {jwtDecode} from "jwt-decode";

export interface JwtPayload {
    userId: string;
    email: string;
    fullName: string;
    role: string;
    iat: string;
    exp: string;
}

export const storeToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const getToken = () => {
    return localStorage.getItem("token") ?? "";
}

export const removeToken = () => {
    localStorage.removeItem("token");
}

export const getPayloadFromToken = (token: string) => {
    return jwtDecode<JwtPayload>(token);
}