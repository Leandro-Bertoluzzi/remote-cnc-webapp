import CheckBox from './checkBox';
import TasksFilterProps from '../types/TasksFilterProps';

function getNameFromStatus(status: string) {
    const text = status.replace('_', ' ');
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const TASK_STATUSES = [
    'pending_approval',
    'on_hold',
    'in_progress',
    'finished',
    'rejected',
    'cancelled'
];

export default function TasksFilter(props: TasksFilterProps) {
    const { initialStatus, updateTaskStatusList } = props;

    return (
        <div className="mb-4">
            {
                TASK_STATUSES.map((status, key) => (
                    <CheckBox
                        key={key}
                        handleOnChange={updateTaskStatusList}
                        initialChecked={initialStatus.includes(status)}
                        text={getNameFromStatus(status)}
                        id={status}
                    />
                ))
            }
        </div>
    )
}
