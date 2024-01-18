export type MessageDialogType = "info" | "warning" | "error";
type btnActionType = () => void;

export default interface MessageDialogProps {
    onClose: btnActionType;
    type?: MessageDialogType;
    title: string;
    text: string;
}
