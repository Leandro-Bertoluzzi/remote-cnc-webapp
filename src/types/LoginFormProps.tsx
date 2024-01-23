type btnActionType = (email: string, password: string) => void;

export default interface LoginFormProps {
    btnSubmitAction: btnActionType;
}
