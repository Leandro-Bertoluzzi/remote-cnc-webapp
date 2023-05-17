import User from "./User";

type btnActionType = () => void;

export default interface UserFormProps {
    exitAction: btnActionType;
    create: boolean;
    userInfo: User;
}
