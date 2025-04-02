import {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router";
import {useAuthContext} from "../../lib/auth/auth-context.ts";
import {locations} from "../../constants/locations.ts";

export const AuthGuard: FC<PropsWithChildren> = ({children}) => {
    const navigate = useNavigate();
    const auth = useAuthContext();

    useEffect(() => {
        if (!auth?.token && !window.location.pathname.includes(locations.AUTH)) {
            navigate(locations.LOGIN);
        }
    }, [auth?.token, navigate])

    return <>{(auth?.token || window.location.pathname.includes(locations.AUTH)) && children}</>
}