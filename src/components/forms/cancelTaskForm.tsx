import { useState } from "react";
import BaseForm from "./baseForm";
import LabeledTextArea from "../discrete/labeledTextArea";
import Task from "@/types/Task";
import { useNotification } from "@/contexts/notificationContext";
import { useItems } from "@/contexts/itemsContext";
import { useAppClients } from "@/contexts/appClientsContext";

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
    const { taskClient } = useAppClients();

    // Hooks for state variables
    const [cancellationReason, setCancellationReason] = useState<string>("");

    const handleCancellationReasonChange = (reason: string) => {
        setCancellationReason(reason);
    };

    /*  Function: cancelTask
     *   Description: Cancels the current task
     */
    const cancelTask = () => {
        taskClient
            .cancelTask(taskInfo.id, cancellationReason)
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
