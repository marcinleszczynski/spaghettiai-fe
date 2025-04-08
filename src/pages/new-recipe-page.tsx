import {FC, useState} from "react";
import {Button, Textarea} from "flowbite-react";
import {useNavigate} from "react-router";
import {useMutation} from "@tanstack/react-query";
import {createRecipe} from "../api/recipe.ts";
import {ErrorModal} from "../components/modals/error-modal.tsx";
import {LoadingModal} from "../components/modals/loading-modal.tsx";

export const NewRecipePage: FC = () => {

    const navigate = useNavigate();
    const [description, setDescription] = useState<string>("");
    const [isShowingLoadingModal, setIsShowingLoadingModal] = useState<boolean>(false);
    const [isShowingErrorModal, setIsShowingErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const loadingMessage = "Preparing your meal...";

    const createRecipeMutation = useMutation({
        mutationFn: () => {
            return createRecipe(description);
        },
        onSuccess: (data) => {
            setIsShowingLoadingModal(false);
            navigate(`/recipe/${data.data.id}`);
        },
        onError: (error) => {
            setErrorMessage(error.message)
            setIsShowingLoadingModal(false);
            setIsShowingErrorModal(true);
        }
    });

    const onCreate = () => {
        setIsShowingLoadingModal(true);
        createRecipeMutation.mutate();
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="text-[40px] text-center text-main-border-dark">
                    Welcome to Spaghetti AI
                </div>
                <div className="text-xl text-center text-main-border-dark">
                    Give us ingredients you have, and we will create you best meal out of it
                </div>
                <div className="relative w-[70%]">
                    <Textarea
                        id="prompt"
                        name="prompt"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-8"
                        placeholder="I have 4 eggs, 100 mg of butter and a bowl of salt."
                        color="gray"
                    />
                    <div className="absolute right-3 bottom-3 flex items">
                        <Button color="main" disabled={!description} onClick={onCreate}>Create</Button>
                    </div>
                </div>
            </div>
            {isShowingErrorModal && (
                <ErrorModal errorMessage={errorMessage} show={isShowingErrorModal} closeFn={() => setIsShowingErrorModal(false)} />
            )}

            {isShowingLoadingModal && (
                <LoadingModal loadingMessage={loadingMessage} show={isShowingLoadingModal} />
            )}
        </>
    )
}