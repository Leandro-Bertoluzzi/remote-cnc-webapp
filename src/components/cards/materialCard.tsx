import { BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import MaterialCardProps from '../../types/MaterialCardProps';

export default function MaterialCard(props: MaterialCardProps) {
    const { material, updateAction } = props;

    // Methods
    const updateMaterial = () => {
        updateAction(material)
    };

    const removeMaterial = () => {
        const url = `materials/${material.id}`;

        apiRequest(url, 'DELETE')
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    };

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: updateMaterial
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: removeMaterial
    }

    return (
        <BaseCard
            mainText={material.name}
            additionalText={[material.description]}
            buttons={[btnEdit, btnRemove]}
        />
    )
}
