import { useState } from "react";
import { BUTTON_EDIT, BUTTON_REMOVE } from "../cards/baseCard";
import apiRequest from "../../services/apiService";
import ButtonInfo from "../../types/ButtonInfo";
import BaseCard from "./baseCard";
import ConfirmDialog from "../dialogs/confirmDialog";
import MaterialCardProps from "../../types/MaterialCardProps";
import MaterialForm from "../forms/materialForm";

export default function MaterialCard(props: MaterialCardProps) {
    // Props
    const { material, setError, setNotification } = props;

    // Hooks for state variables
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);

    /*  Function: removeMaterial
     *   Description: Removes the current material
     */
    const removeMaterial = () => {
        hideRemoveConfirmationModal();

        const url = `materials/${material.id}`;

        apiRequest(url, "DELETE")
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: showUpdateMaterialFormModal
     *   Description: Enables the modal to update the current material
     */
    function showUpdateMaterialFormModal() {
        setShowMaterialForm(true);
    }

    /*  Function: hideMaterialFormModal
     *   Description: Disables the modal to update the current material
     */
    function hideMaterialFormModal() {
        setShowMaterialForm(false);
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
        action: showUpdateMaterialFormModal,
    };
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: showRemoveConfirmationModal,
    };

    return (
        <>
            <BaseCard
                mainText={material.name}
                additionalText={[material.description]}
                buttons={[btnEdit, btnRemove]}
            />
            {showMaterialForm && (
                <MaterialForm
                    exitAction={hideMaterialFormModal}
                    create={false}
                    materialInfo={material}
                    setError={setError}
                    setNotification={setNotification}
                />
            )}
            {showRemoveConfirmation && (
                <ConfirmDialog
                    title="Eliminar material"
                    text="¿Está seguro de que desea eliminar el material? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeMaterial}
                    onCancel={hideRemoveConfirmationModal}
                />
            )}
        </>
    );
}
