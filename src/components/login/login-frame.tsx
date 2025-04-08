import {FC, PropsWithChildren} from "react";

interface Props {
    width: number;
    height: number;
}

export const LoginFrame: FC<PropsWithChildren<Props>> = ({children, height, width}) => {
    return (
        <div className={`w-[${width}%] h-[${height}%] min-w-[700px] min-h-[400px] rounded-[40px] bg-gradient-to-b from-green-900 to-green-400 border-main-border-dark border-[2px] flex flex-col items-center justify-around p-4`}>
            {children}
        </div>
    )
}