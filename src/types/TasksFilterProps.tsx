type btnActionType = (status: string, add: boolean) => void;

export default interface TasksFilterProps {
    filterStatus: string[];
    updateTaskStatusList: btnActionType;
}
