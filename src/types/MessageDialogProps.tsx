export type MessageDialogType = "info" | "warning" | "error";

export default interface MessageDialogProps {
    onClose: () => void;
    type?: MessageDialogType;
    title: string;
    text: string;
}
