import { BsInfoCircle, BsExclamationTriangle } from "react-icons/bs";
import MessageDialogProps from "@/types/MessageDialogProps";
import { Modal, Button } from "flowbite-react";

export default function MessageDialog(props: MessageDialogProps) {
    // Props
    const { onClose, type, title, text } = props;

    return (
        <Modal dismissible show={true} size="md" onClose={onClose} popup>
            <Modal.Body>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                        {type == "info" && (
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                <BsInfoCircle
                                    className="h-5 w-5 text-blue-600"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                        {type == "warning" && (
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                <BsExclamationTriangle
                                    className="h-5 w-5 text-yellow-600"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                        {type == "error" && (
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <BsExclamationTriangle
                                    className="h-5 w-5 text-red-600"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
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
                    <Button color="indigo" onClick={() => onClose()}>
                        Entendido
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
