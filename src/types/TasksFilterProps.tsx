type btnActionType = (status: string, add: boolean) => void;

export default interface TasksFilterProps {
    initialStatus: string[];
    updateTaskStatusList: btnActionType;
}
