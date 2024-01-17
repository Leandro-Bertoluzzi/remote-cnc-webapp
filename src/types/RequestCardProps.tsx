import Task from './Task';

type setStringActionType = (str: string) => void;

export default interface RequestCardProps {
    task: Task;
    setError: setStringActionType;
    setNotification: setStringActionType;
}
