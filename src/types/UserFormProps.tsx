import User from "./User";

type btnActionType = () => void;
type setStringActionType = (str: string) => void;

export default interface UserFormProps {
    exitAction: btnActionType;
    create: boolean;
    userInfo: User;
    setError: setStringActionType;
    setNotification: setStringActionType;
}
