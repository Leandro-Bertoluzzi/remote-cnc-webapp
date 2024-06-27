type onErrorActionType = (message: string) => void;

export default interface LoginFormProps {
    onErrorAction: onErrorActionType;
}
