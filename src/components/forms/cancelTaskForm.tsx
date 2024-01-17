import { useState } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import CancelTaskFormProps from '../../types/CancelTaskFormProps';
import LabeledTextArea from '../discrete/labeledTextArea';

export default function CancelTaskForm(props: CancelTaskFormProps) {
    // Props
    const {
        exitAction,
        taskInfo,
        setError,
        setNotification
    } = props;

    // Hooks for state variables
    const [cancellationReason, setCancellationReason] = useState<string>("");

    const handleCancellationReasonChange = (reason: string) => {
        setCancellationReason(reason);
    };

    /*  Function: cancelTask
    *   Description: Cancels the current task
    */
    const cancelTask = () => {
        const data = {
            "status": 'cancelled',
            'cancellation_reason': cancellationReason,
        }
        const url = `tasks/${taskInfo.id}/status`;

        apiRequest(url, 'PUT', data, true)
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });

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
                <LabeledTextArea
                    label="Razón de cancelación"
                    name="task-cancel"
                    handleChange={handleCancellationReasonChange}
                    value={cancellationReason}
                    placeholder="Escribe la razón aquí..."
                />
            </div>
        </BaseForm>
    )
}
