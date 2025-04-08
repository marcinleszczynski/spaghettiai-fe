import {FC} from "react";
import {Button, Modal, ModalBody, ModalHeader} from "flowbite-react";
import errorIcon from "../../icons/error-icon.svg"

interface Props {
    errorMessage: string;
    show: boolean;
    closeFn: () => void;
}

export const ErrorModal: FC<Props> = ({errorMessage, show, closeFn}) => {

    return (
        <Modal show={show} onClose={closeFn} position="center">
            <ModalHeader className="text-red-600">Error</ModalHeader>
            <ModalBody>
                <div className="flex flex-col justify-center items-center">
                    <img src={errorIcon} className="w-[60px] h-[60px]" alt="error-icon"/>
                    <div className="text-red-600 text-lg">
                        {errorMessage || "Error Appeared"}
                    </div>
                    <Button className="mt-5" color="error" onClick={closeFn}>OK</Button>
                </div>
            </ModalBody>
        </Modal>
    )
}