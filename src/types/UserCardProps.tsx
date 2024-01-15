import User from './User';

type setStringActionType = (str: string) => void;

export default interface UserCardProps {
    user: User;
    setError: setStringActionType;
}
