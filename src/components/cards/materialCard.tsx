import { useState } from 'react';
import { BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import MaterialCardProps from '../../types/MaterialCardProps';
import MaterialForm from '../forms/materialForm';

export default function MaterialCard(props: MaterialCardProps) {
    // Props
    const { material } = props;

    // Hooks for state variables
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);

    /*  Function: removeMaterial
    *   Description: Removes the current material
    */
    const removeMaterial = () => {
        const url = `materials/${material.id}`;

        apiRequest(url, 'DELETE')
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
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
                <MaterialForm exitAction={hideMaterialFormModal} create={false} materialInfo={material} />
            }
        </>
    )
}
