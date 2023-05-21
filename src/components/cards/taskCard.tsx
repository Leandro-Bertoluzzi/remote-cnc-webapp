import { BUTTON_CANCEL } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import TaskCardProps from '../../types/TaskCardProps';

export default function TaskCard(props: TaskCardProps) {
    const { task, show } = props;

    // Text
    const materialText = `Material: ${task.material}`;
    const toolText = `Tool: ${task.tool}`;
    const fileText = `File: ${task.file}`;

    // Buttons
    const btnCancel: ButtonInfo = {
        type: BUTTON_CANCEL,
        action: () => {}
    }

    if (!show) {
        return <></>;
    }

    return (
        <BaseCard
            mainText={task.name}
            additionalText={[materialText, toolText, fileText, task.note]}
            buttons={[btnCancel]}
        />
    )
}
