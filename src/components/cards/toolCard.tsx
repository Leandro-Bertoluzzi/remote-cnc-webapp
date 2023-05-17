import { BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import Card from './card';
import ToolCardProps from '../../types/ToolCardProps';

export default function ToolCard(props: ToolCardProps) {
    const { tool } = props;

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
            mainText={tool.name}
            additionalText={[tool.description]}
            buttons={[btnEdit, btnRemove]}
        />
    )
}
