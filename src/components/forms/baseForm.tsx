import { Button, Modal } from "flowbite-react";
import { ReactNode } from "react";

export interface BaseFormProps {
    title: string;
    subtitle: string;
    exitAction: () => void;
    children: ReactNode;
    btnSubmitAction: () => void;
    btnSubmitText: string;
}

export default function BaseForm(props: BaseFormProps) {
    // Props
    const { title, subtitle, exitAction, btnSubmitAction, btnSubmitText } = props;

    return (
        <Modal dismissible show={true} onClose={exitAction}>
            <Modal.Header>
                <div className="w-auto p-2">
                    <h3 className="font-heading mb-1 text-lg font-semibold text-neutral-600">
                        {title}
                    </h3>
                    {subtitle && <p className="text-sm font-medium text-neutral-400">{subtitle}</p>}
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={btnSubmitAction} className="mx-auto flex max-w-md flex-col">
                    {props.children}
                    <Button type="submit">{btnSubmitText}</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
