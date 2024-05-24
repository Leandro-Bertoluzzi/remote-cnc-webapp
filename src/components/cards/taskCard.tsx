import { useState } from "react";
import {
    BUTTON_CANCEL,
    BUTTON_EDIT,
    BUTTON_APPROVE,
    BUTTON_PAUSE,
    BUTTON_REMOVE,
    BUTTON_RESTORE,
    BUTTON_REPEAT,
    BUTTON_RETRY,
    BUTTON_RUN,
} from "../discrete/cardButton";
import apiRequest from "../../services/apiService";
import ButtonInfo, { ButtonInfoArray } from "../../types/ButtonInfo";
import BaseCard from "./baseCard";
import CancelTaskForm from "../forms/cancelTaskForm";
import ConfirmDialog from "../dialogs/confirmDialog";
import TaskCardProps from "../../types/TaskCardProps";
import TaskForm from "../forms/taskForm";

// Type definitions
type actionType = () => void;

export default function TaskCard(props: TaskCardProps) {
    // Props
    const { task, show, toolsList, materialsList, filesList, setError, setNotification } = props;

    // Hooks for state variables
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [createTask, setCreateTask] = useState<boolean>(false);
    const [showCancelTaskForm, setShowCancelTaskForm] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = useState<string>("");
    const [confirmDialogText, setConfirmDialogText] = useState<string>("");
    const [onConfirmMethod, setOnConfirmMethod] = useState<actionType>(() => () => {
        return;
    });

    // Text
    const materialText = `Material: ${materialsList.find((material) => material.id == task.material_id)?.name}`;
    const toolText = `Herramienta: ${toolsList.find((tool) => tool.id == task.tool_id)?.name}`;
    const fileText = `Archivo: ${filesList.find((file) => file.id == task.file_id)?.name}`;
    const additionalText = [materialText, toolText, fileText];

    // Constants

    const TASK_FINISHED_STATUS = "finished";
    const TASK_CANCELLED_STATUS = "cancelled";
    const TASK_ON_HOLD_STATUS = "on_hold";
    const TASK_APPROVED_STATUS = TASK_ON_HOLD_STATUS;
    const TASK_INITIAL_STATUS = "pending_approval";
    const TASK_FAILED_STATUS = "failed";
    const TASK_IN_PROGRESS_STATUS = "in_progress";

    // Card buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateTaskFormModal,
    };
    const btnCancel: ButtonInfo = {
        type: BUTTON_CANCEL,
        action: showCancelTaskFormModal,
    };
    const btnApprove: ButtonInfo = {
        type: BUTTON_APPROVE,
        action: showApproveConfirmationModal,
    };
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: showRemoveConfirmationModal,
    };
    const btnRestore: ButtonInfo = {
        type: BUTTON_RESTORE,
        action: showRestoreConfirmationModal,
    };
    const btnRepeat: ButtonInfo = {
        type: BUTTON_REPEAT,
        action: showDuplicateTaskFormModal,
    };
    const btnRetry: ButtonInfo = {
        type: BUTTON_RETRY,
        action: showDuplicateTaskFormModal,
    };
    const btnRun: ButtonInfo = {
        type: BUTTON_RUN,
        action: () => {
            return;
        },
    };
    const btnPause: ButtonInfo = {
        //('Retomar' if self.paused else 'Pausar', self.pauseTask)
        type: BUTTON_PAUSE,
        action: () => {
            return;
        },
    };

    const button_info: ButtonInfoArray = {
        [TASK_INITIAL_STATUS]: [btnEdit, btnApprove, btnCancel],
        [TASK_ON_HOLD_STATUS]: [btnCancel, btnRun],
        [TASK_CANCELLED_STATUS]: [btnRemove, btnRestore],
        [TASK_IN_PROGRESS_STATUS]: [btnPause],
        [TASK_FINISHED_STATUS]: [btnRepeat],
        [TASK_FAILED_STATUS]: [btnRetry],
    };

    const cardButtons: ButtonInfo[] = [];
    for (const key in button_info) {
        if (task.status == key) {
            button_info[key].forEach((button) => {
                cardButtons.push(button);
            });
        }
    }

    // Customization by status

    if (task.note) {
        additionalText.push(task.note);
    }
    if (
        [TASK_ON_HOLD_STATUS, TASK_IN_PROGRESS_STATUS, TASK_FINISHED_STATUS].includes(task.status)
    ) {
        additionalText.push(`Aprobada por ${task.admin_id}`);
    }
    if (task.status === TASK_CANCELLED_STATUS && task.admin_id) {
        additionalText.push(`Rechazada por ${task.admin_id}`);
    }
    if (task.status === TASK_CANCELLED_STATUS) {
        additionalText.push(`Motivo de cancelación: ${task.cancellation_reason}`);
    }

    // API requests

    /*  Function: updateTaskStatus
     *   Description: Requests the API to update the task status
     */
    const updateTaskStatus = (status: string) => {
        const data = { status };
        const url = `tasks/${task.id}/status`;

        apiRequest(url, "PUT", data, true)
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: removeTask
     *   Description: Removes the current task
     */
    const removeTask = () => {
        const url = `tasks/${task.id}`;

        apiRequest(url, "DELETE")
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: approveTask
     *   Description: Approves the current request
     */
    const approveTask = () => {
        updateTaskStatus(TASK_APPROVED_STATUS);
    };

    /*  Function: restoreTask
     *   Description: Restores the current task to its initial state
     */
    const restoreTask = () => {
        updateTaskStatus(TASK_INITIAL_STATUS);
    };

    // Actions

    /*  Function: showUpdateTaskFormModal
     *   Description: Enables the modal to update the current task
     */
    function showUpdateTaskFormModal() {
        setCreateTask(false);
        setShowTaskForm(true);
    }

    /*  Function: showDuplicateTaskFormModal
     *   Description: Enables the modal to create a duplicate of the current task
     */
    function showDuplicateTaskFormModal() {
        setCreateTask(true);
        setShowTaskForm(true);
    }

    /*  Function: hideUpdateTaskFormModal
     *   Description: Disables the modal to update the current task
     */
    function hideUpdateTaskFormModal() {
        setShowTaskForm(false);
    }

    /*  Function: showCancelTaskFormModal
     *   Description: Enables the modal to cancel the current task
     */
    function showCancelTaskFormModal() {
        setShowCancelTaskForm(true);
    }

    /*  Function: hideCancelFormModal
     *   Description: Disables the modal to cancel the current task
     */
    function hideCancelFormModal() {
        setShowCancelTaskForm(false);
    }

    /*  Function: showApproveConfirmationModal
     *   Description: Enables the modal to confirm the approval
     */
    function showApproveConfirmationModal() {
        setConfirmDialogTitle("Aprobar tarea");
        setConfirmDialogText("¿Está seguro de que desea aprobar la tarea?");
        setOnConfirmMethod(() => () => approveTask());
        setShowConfirmation(true);
    }

    /*  Function: showConfirmationModal
     *   Description: Enables the modal to confirm the restore
     */
    function showRestoreConfirmationModal() {
        setConfirmDialogTitle("Restaurar tarea");
        setConfirmDialogText(
            "¿Realmente desea restaurar la tarea? \
            Esto la devolverá al estado inicial, pendiente de aprobación"
        );
        setOnConfirmMethod(() => () => restoreTask());
        setShowConfirmation(true);
    }

    /*  Function: showRemoveConfirmationModal
     *   Description: Enables the modal to confirm the removal
     */
    function showRemoveConfirmationModal() {
        setConfirmDialogTitle("Eliminar tarea");
        setConfirmDialogText("¿Realmente desea eliminar la tarea?");
        setOnConfirmMethod(() => () => removeTask());
        setShowConfirmation(true);
    }

    /*  Function: onConfirm
     *   Description: Executes the selected action
     */
    function onConfirm() {
        hideConfirmationModal();
        onConfirmMethod();
    }

    /*  Function: hideConfirmationModal
     *   Description: Disables the confirmation dialog
     */
    function hideConfirmationModal() {
        setShowConfirmation(false);
    }

    if (!show) {
        return <></>;
    }

    return (
        <>
            <BaseCard mainText={task.name} additionalText={additionalText} buttons={cardButtons} />
            {showTaskForm && (
                <TaskForm
                    exitAction={hideUpdateTaskFormModal}
                    create={createTask}
                    taskInfo={task}
                    toolsList={toolsList}
                    materialsList={materialsList}
                    filesList={filesList}
                    setError={setError}
                    setNotification={setNotification}
                />
            )}
            {showCancelTaskForm && (
                <CancelTaskForm
                    exitAction={hideCancelFormModal}
                    taskInfo={task}
                    setError={setError}
                    setNotification={setNotification}
                />
            )}
            {showConfirmation && (
                <ConfirmDialog
                    title={confirmDialogTitle}
                    text={confirmDialogText}
                    confirmText="Aceptar"
                    onAccept={onConfirm}
                    onCancel={hideConfirmationModal}
                />
            )}
        </>
    );
}
