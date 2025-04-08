import {FC, PropsWithChildren} from "react";

export const LoginBackground: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="absolute z-0 inset-0 w-[100vw] h-[100vh] bg-[url('/cooking-bg-login.jpg')]">
            <div className="w-[100%] h-[100%] backdrop-blur-xl flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}