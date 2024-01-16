import CustomCheckBox from './customCheckBox';
import TasksFilterProps from '../../types/TasksFilterProps';
import { Dropdown } from 'flowbite-react';

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
    // Props
    const { filterStatus, updateTaskStatusList } = props;

    return (
        <Dropdown label="Filtrar estados" dismissOnClick={false}>
            {
                TASK_STATUSES.map((status, key) => (
                    <Dropdown.Item key={key}>
                        <CustomCheckBox
                            handleOnChange={updateTaskStatusList}
                            isChecked={filterStatus.includes(status)}
                            text={getNameFromStatus(status)}
                            id={status}
                        />
                    </Dropdown.Item>
                ))
            }
        </Dropdown>
    )
}
