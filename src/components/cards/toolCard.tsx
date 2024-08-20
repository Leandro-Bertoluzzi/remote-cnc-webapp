import { useState } from "react";
import { BUTTON_EDIT, BUTTON_REMOVE } from "../discrete/cardButton";
import apiRequest from "@/services/apiService";
import ButtonInfo from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import ConfirmDialog from "../dialogs/confirmDialog";
import Tool from "@/types/Tool";
import ToolForm from "../forms/toolForm";
import { useNotification } from "@/contexts/notificationContext";

export interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard(props: ToolCardProps) {
    // Props
    const { tool } = props;

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Hooks for state variables
    const [showToolForm, setShowToolForm] = useState<boolean>(false);
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);

    /*  Function: removeTool
     *   Description: Removes the current tool
     */
    const removeTool = () => {
        hideRemoveConfirmationModal();

        const url = `tools/${tool.id}`;

        apiRequest(url, "DELETE")
            .then((response) => {
                showNotification(response.success);
            })
            .catch((err) => {
                showErrorDialog(err.message);
            });
    };

    /*  Function: showUpdateToolFormModal
     *   Description: Enables the modal to update the current tool
     */
    function showUpdateToolFormModal() {
        setShowToolForm(true);
    }

    /*  Function: hideToolFormModal
     *   Description: Disables the modal to update the current tool
     */
    function hideToolFormModal() {
        setShowToolForm(false);
    }

    /*  Function: showRemoveConfirmationModal
     *   Description: Enables the modal to confirm the removal of the file
     */
    function showRemoveConfirmationModal() {
        setShowRemoveConfirmation(true);
    }

    /*  Function: hideRemoveConfirmationModal
     *   Description: Disables the modal to confirm the removal of the file
     */
    function hideRemoveConfirmationModal() {
        setShowRemoveConfirmation(false);
    }

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateToolFormModal,
    };
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: showRemoveConfirmationModal,
    };

    return (
        <>
            <BaseCard
                mainText={tool.name}
                additionalText={[tool.description]}
                buttons={[btnEdit, btnRemove]}
            />
            {showToolForm && (
                <ToolForm exitAction={hideToolFormModal} create={false} toolInfo={tool} />
            )}
            {showRemoveConfirmation && (
                <ConfirmDialog
                    title="Eliminar herramienta"
                    text="¿Está seguro de que desea eliminar la herramienta? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeTool}
                    onCancel={hideRemoveConfirmationModal}
                />
            )}
        </>
    );
}
