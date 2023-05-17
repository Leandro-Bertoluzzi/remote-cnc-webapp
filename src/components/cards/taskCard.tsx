import { BUTTON_APPROVE, BUTTON_REJECT, BUTTON_CANCEL } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import TaskCardProps from '../../types/TaskCardProps';

export default function TaskCard(props: TaskCardProps) {
    const { task } = props;

    // Text
    const materialText = `Material: ${task.material}`;
    const toolText = `Tool: ${task.tool}`;
    const fileText = `File: ${task.file}`;

    // TODO (buttons): approve+reject for admin, cancel for user

    // Buttons
    const btnApprove: ButtonInfo = {
        type: BUTTON_APPROVE,
        action: () => {}
    }
    const btnReject: ButtonInfo = {
        type: BUTTON_REJECT,
        action: () => {}
    }
    const btnCancel: ButtonInfo = {
        type: BUTTON_CANCEL,
        action: () => {}
    }

    return (
        <BaseCard
            mainText={task.name}
            additionalText={[materialText, toolText, fileText, task.note]}
            buttons={[btnApprove, btnReject, btnCancel]}
        />
    )
}
