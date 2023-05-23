import { ChangeEvent, useState } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import CancelTaskFormProps from '../../types/CancelTaskFormProps';

export default function CancelTaskForm(props: CancelTaskFormProps) {
    // Props
    const {
        exitAction,
        taskInfo
    } = props;

    // Hooks for state variables
    const [cancellationReason, setCancellationReason] = useState<string>("");

    const handleCancellationReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value) {
            setCancellationReason(e.target.value);
        }
    };

    /*  Function: cancelTask
    *   Description: Cancels the current task
    */
    const cancelTask = () => {
        const data = {
            'user_id': taskInfo.user_id,
            "status": 'cancelled',
            'cancellation_reason': cancellationReason,
        }
        const url = `tasks/${taskInfo.id}/status`;

        apiRequest(url, 'PUT', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    return (
        <BaseForm
            title="Cancelar pedido"
            subtitle=""
            exitAction={exitAction}
            btnSubmitAction={cancelTask}
            btnSubmitText="Aceptar"
        >
            <div className="mb-5 w-full overflow-x-auto">
                <label className="block font-medium" htmlFor="task-name-input">Razón de cancelación: </label>
                <textarea
                    id="task-name-input"
                    name="cancellation_reason"
                    onChange={handleCancellationReasonChange}
                    value={cancellationReason}
                    rows={3} cols={50}
                >
                </textarea>
            </div>
        </BaseForm>
    )
}
