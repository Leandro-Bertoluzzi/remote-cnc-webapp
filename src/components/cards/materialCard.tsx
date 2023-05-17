import { BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import Card from './card';
import MaterialCardProps from '../../types/MaterialCardProps';

export default function MaterialCard(props: MaterialCardProps) {
    const { material } = props;

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: () => {}
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: () => {}
    }

    return (
        <Card
            mainText={material.name}
            additionalText={[material.description]}
            buttons={[btnEdit, btnRemove]}
        />
    )
}
