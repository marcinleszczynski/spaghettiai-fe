import {FC, PropsWithChildren} from "react";
import {Modal, ModalBody, ModalHeader} from "flowbite-react";
import successIcon from "../../icons/success-icon.svg"

interface Props {
    show: boolean;
    closeFn: () => void;
}

export const LinkSentModal: FC<PropsWithChildren<Props>> = ({show, closeFn}) => {
    return (
        <Modal show={show} onClose={closeFn}>
            <ModalHeader className="text-white">Success</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-2 items-center">
                    <img src={successIcon} className="w-1/4 h-1/4" alt="success-icon" />
                    <div className="text-white text-lg">
                        Activation link was sent to E-mail you provided. Check your E-mail to activate your account.
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}