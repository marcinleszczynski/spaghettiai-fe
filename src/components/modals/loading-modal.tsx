import {FC} from "react";
import {Modal, ModalBody, ModalHeader, Spinner} from "flowbite-react";

interface Props {
    loadingMessage: string;
    show: boolean;
}

export const LoadingModal: FC<Props> = ({loadingMessage, show}) => {
    return (
        <Modal show={show} dismissible={false} position="center">
            <ModalHeader className="text-white">Loading</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-6 justify-center items-center">
                    <Spinner color="primary" size="xl" />
                    <div className="text-white text-lg">
                        {loadingMessage || "Loading..."}
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}