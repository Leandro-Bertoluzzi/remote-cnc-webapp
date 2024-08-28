import { BsExclamationTriangle } from "react-icons/bs";
import { Modal, Button } from "flowbite-react";

interface ConfirmDialogProps {
    onAccept: () => void;
    onCancel: () => void;
    title: string;
    text: string;
    confirmText: string;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
    // Props
    const { onAccept, onCancel, title, text, confirmText } = props;

    return (
        <Modal dismissible show={true} size="md" onClose={onCancel} popup>
            <Modal.Body>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                            <BsExclamationTriangle
                                className="h-5 w-5 text-yellow-600"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                {title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">{text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center px-4 py-3 sm:px-6">
                    <Button color="indigo" onClick={onAccept}>
                        {confirmText}
                    </Button>
                    <Button color="red" onClick={onCancel}>
                        Cancelar
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
