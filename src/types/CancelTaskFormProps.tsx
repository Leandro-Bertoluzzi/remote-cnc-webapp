import Task from "./Task";

type btnActionType = () => void;
type setStringActionType = (str: string) => void;

export default interface CancelTaskFormProps {
    exitAction: btnActionType;
    taskInfo: Task;
    setError: setStringActionType;
}
