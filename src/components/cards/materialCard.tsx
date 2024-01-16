import { useState } from 'react';
import { BUTTON_EDIT, BUTTON_REMOVE } from '../cards/baseCard';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import MaterialCardProps from '../../types/MaterialCardProps';
import MaterialForm from '../forms/materialForm';

export default function MaterialCard(props: MaterialCardProps) {
    // Props
    const { material, setError } = props;

    // Hooks for state variables
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);

    /*  Function: removeMaterial
    *   Description: Removes the current material
    */
    const removeMaterial = () => {
        const url = `materials/${material.id}`;

        apiRequest(url, 'DELETE')
            .then((response) => {
                console.log(response);
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

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateMaterialFormModal
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: removeMaterial
    }

    return (
        <>
            <BaseCard
                mainText={material.name}
                additionalText={[material.description]}
                buttons={[btnEdit, btnRemove]}
            />
            {showMaterialForm &&
                <MaterialForm setError={setError} exitAction={hideMaterialFormModal} create={false} materialInfo={material} />
            }
        </>
    )
}
