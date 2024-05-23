import { useState } from "react";
import { BUTTON_CANCEL, BUTTON_EDIT, BUTTON_APPROVE } from "../cards/baseCard";
import apiRequest from "../../services/apiService";
import ButtonInfo from "../../types/ButtonInfo";
import BaseCard from "./baseCard";
import CancelTaskForm from "../forms/cancelTaskForm";
import ConfirmDialog from "../dialogs/confirmDialog";
import TaskCardProps from "../../types/TaskCardProps";
import TaskForm from "../forms/taskForm";

export default function TaskCard(props: TaskCardProps) {
    // Props
    const { task, show, toolsList, materialsList, filesList, setError, setNotification } = props;

    // Hooks for state variables
    const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false);
    const [showCancelTaskForm, setShowCancelTaskForm] = useState<boolean>(false);
    const [showApproveConfirmation, setShowApproveConfirmation] = useState<boolean>(false);

    // Text
    const materialText = `Material: ${materialsList.find((material) => material.id == task.material_id)?.name}`;
    const toolText = `Tool: ${toolsList.find((tool) => tool.id == task.tool_id)?.name}`;
    const fileText = `File: ${filesList.find((file) => file.id == task.file_id)?.name}`;
    const additionalText = [materialText, toolText, fileText];

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
        action: showRemoveConfirmationModal,
    };
    const cardButtons: ButtonInfo[] = []

    // Customization by status

    if (task.note) {
        additionalText.push(task.note);
    }
    if (task.status === "pending_approval") {
        cardButtons.push(btnEdit);
        cardButtons.push(btnApprove);
        cardButtons.push(btnCancel);
    }
    if (task.status === "on_hold" || task.status === "in_progress" || task.status === "finished") {
        additionalText.push(`Approved by ${task.admin_id}`);
    }
    if (task.status === "cancelled" && task.admin_id) {
        additionalText.push(`Rejected by ${task.admin_id}`);
    }
    if (task.status === "cancelled") {
        additionalText.push(`Cancellation reason: ${task.cancellation_reason}`);
    }

    /*  Function: approveRequest
     *   Description: Approves the current request
     */
    const approveRequest = () => {
        hideApproveConfirmationModal();

        const data = {
            status: "on_hold",
        };
        const url = `tasks/${task.id}/status`;

        apiRequest(url, "PUT", data, true)
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: showUpdateTaskFormModal
     *   Description: Enables the modal to update the current task
     */
    function showUpdateTaskFormModal() {
        setShowUpdateTaskForm(true);
    }

    /*  Function: hideUpdateTaskFormModal
     *   Description: Disables the modal to update the current task
     */
    function hideUpdateTaskFormModal() {
        setShowUpdateTaskForm(false);
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

    /*  Function: showRemoveConfirmationModal
     *   Description: Enables the modal to confirm the approval
     */
    function showRemoveConfirmationModal() {
        setShowApproveConfirmation(true);
    }

    /*  Function: hideApproveConfirmationModal
     *   Description: Disables the modal to confirm the approval
     */
    function hideApproveConfirmationModal() {
        setShowApproveConfirmation(false);
    }

    if (!show) {
        return <></>;
    }

    return (
        <>
            <BaseCard
                mainText={task.name}
                additionalText={additionalText}
                buttons={cardButtons}
            />
            {showUpdateTaskForm && (
                <TaskForm
                    exitAction={hideUpdateTaskFormModal}
                    create={false}
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
            {showApproveConfirmation && (
                <ConfirmDialog
                    title="Aprobar solicitud"
                    text="¿Está seguro de que desea aprobar la solicitud?"
                    confirmText="Aprobar"
                    onAccept={approveRequest}
                    onCancel={hideApproveConfirmationModal}
                />
            )}
        </>
    );
}
