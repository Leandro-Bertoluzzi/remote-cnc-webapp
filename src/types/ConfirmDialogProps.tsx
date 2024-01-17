type btnActionType = () => void;

export default interface ConfirmDialogProps {
    onAccept: btnActionType;
    onCancel: btnActionType;
    title: string;
    text: string;
    confirmText: string;
}
