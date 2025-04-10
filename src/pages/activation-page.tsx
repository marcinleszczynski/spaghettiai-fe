import {FC, useEffect, useState} from "react";
import {LoginBackground} from "../components/login/login-background.tsx";
import {LoadingModal} from "../components/modals/loading-modal.tsx";
import {useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {activate} from "../api/auth.ts";
import {locations} from "../constants/locations.ts";
import {useSearchParams} from "react-router-dom";

export const ActivationPage: FC = () => {

    const loadingMessage = "Activating your account...";
    const [isShowingLoadingModal, setIsShowingLoadingModal] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const activationCode = searchParams.get("code");
    const navigate = useNavigate();

    const activationMutation = useMutation({
        mutationFn: () => {
            return activate(activationCode ?? "");
        },
        onSuccess: () => {
            setIsShowingLoadingModal(false);
            console.log("Successfully Activated Account!");
            navigate(locations.LOGIN);
        },
        onError: () => {
            setIsShowingLoadingModal(false);
            console.log("Failed to activate account");
            navigate(locations.LOGIN);
        },
    })

    useEffect(() => {
        if (activationCode) {
            setIsShowingLoadingModal(true);
            activationMutation.mutate();
        }

    }, [activationCode]);

    return (
        <>
            <LoginBackground>
                {isShowingLoadingModal && (
                    <LoadingModal loadingMessage={loadingMessage} show={isShowingLoadingModal} />
                )}
            </LoginBackground>
        </>
    )
}