import {JwtPayload} from "./token-provider.ts";
import {createContext, useContext} from "react";

export interface IAuthContext {
    user: JwtPayload | null;
    login: (token: string) => void;
    logout: () => void;
    token: string;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
    return useContext(AuthContext);
}