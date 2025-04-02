import {FC, PropsWithChildren} from "react";
import {Spinner} from "flowbite-react";

interface Props {
    isLoading: boolean;
}

export const LoadingButtonWrapper: FC<PropsWithChildren<Props>> = ({children, isLoading}) => {
    return (
        <div className="relative w-fit">
            {children}
            {isLoading && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner color="primary" size="md" />
                </div>
            )}
        </div>
    )
}