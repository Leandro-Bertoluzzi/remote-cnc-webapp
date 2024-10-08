import { useState } from "react";
import apiRequest from "@/services/apiService";
import BaseForm from "./baseForm";
import LabeledTextArea from "../discrete/labeledTextArea";
import Task from "@/types/Task";
import { useNotification } from "@/contexts/notificationContext";
import { useItems } from "@/contexts/itemsContext";

export interface CancelTaskFormProps {
    exitAction: () => void;
    taskInfo: Task;
}

export default function CancelTaskForm(props: CancelTaskFormProps) {
    // Props
    const { exitAction, taskInfo } = props;

    // Context
    const { showErrorDialog, showNotification } = useNotification();
    const { fetchTasks } = useItems();

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
            status: "cancelled",
            cancellation_reason: cancellationReason,
        };
        const url = `tasks/${taskInfo.id}/status`;

        apiRequest(url, "PUT", data, true)
            .then((response) => {
                showNotification(response.success);
                fetchTasks();
            })
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    return (
        <BaseForm
            title="Cancelar tarea"
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
    );
}
