import { BUTTON_APPROVE, BUTTON_REJECT } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import RequestCardProps from '../../types/RequestCardProps';

export default function RequestCard(props: RequestCardProps) {
    const { task } = props;

    // Text
    const materialText = `Material: ${task.material}`;
    const toolText = `Tool: ${task.tool}`;
    const fileText = `File: ${task.file}`;

    // Buttons
    const btnApprove: ButtonInfo = {
        type: BUTTON_APPROVE,
        action: () => {}
    }
    const btnReject: ButtonInfo = {
        type: BUTTON_REJECT,
        action: () => {}
    }

    return (
        <BaseCard
            mainText={task.name}
            additionalText={[materialText, toolText, fileText, task.note]}
            buttons={[btnApprove, btnReject]}
        />
    )
}
