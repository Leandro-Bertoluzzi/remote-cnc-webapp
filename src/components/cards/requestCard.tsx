import { BUTTON_APPROVE, BUTTON_REJECT } from '../cardButton';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import RequestCardProps from '../../types/RequestCardProps';

const APPROVED_STATUS = 'on_hold';
const REJECTED_STATUS = 'rejected';

export default function RequestCard(props: RequestCardProps) {
    const { task } = props;

    // Text
    const materialText = `Material: ${task.material}`;
    const toolText = `Tool: ${task.tool}`;
    const fileText = `File: ${task.file}`;

    /*  Function: approveRequest
    *   Description: Approves the current request
    */
    const approveRequest = () => {
        const data = {
            'status': APPROVED_STATUS
        }
        const url = `tasks/${task.id}/status`;

        apiRequest(url, 'PUT', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    /*  Function: rejectRequest
    *   Description: Rejects the current request
    */
    const rejectRequest = () => {
        const data = {
            'status': REJECTED_STATUS
        }
        const url = `tasks/${task.id}/status`;

        apiRequest(url, 'PUT', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    // Buttons
    const btnApprove: ButtonInfo = {
        type: BUTTON_APPROVE,
        action: approveRequest
    }
    const btnReject: ButtonInfo = {
        type: BUTTON_REJECT,
        action: rejectRequest
    }

    return (
        <BaseCard
            mainText={task.name}
            additionalText={[materialText, toolText, fileText, task.note]}
            buttons={[btnApprove, btnReject]}
        />
    )
}
