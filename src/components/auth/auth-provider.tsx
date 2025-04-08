import {FC, PropsWithChildren, useState} from "react";
import {AuthContext, IAuthContext} from "../../lib/auth/auth-context.ts";
import {getPayloadFromToken, getToken, JwtPayload, removeToken, storeToken} from "../../lib/auth/token-provider.ts";

export const AuthProvider: FC<PropsWithChildren> = function ({ children }) {

    const [token, setToken] = useState<string>(getToken());
    const [user, setUser] = useState<JwtPayload | null>(null);

    const login = (token: string) => {
        storeToken(token);
        setToken(token);
        setUser(getPayloadFromToken(token));
    }

    const logout = () => {
        removeToken();
        setToken("");
        setUser(null);
    }

    const auth: IAuthContext = {
        login,
        logout,
        user,
        token: token ?? ""
    }

    return (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    )
}