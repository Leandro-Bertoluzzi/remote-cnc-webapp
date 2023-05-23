import Task from "./Task";

type btnActionType = () => void;

export default interface CancelTaskFormProps {
    exitAction: btnActionType;
    taskInfo: Task;
}
