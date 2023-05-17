import { BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import ToolCardProps from '../../types/ToolCardProps';

export default function ToolCard(props: ToolCardProps) {
    const { tool, updateAction } = props;

    // Methods
    const updateTool = () => {
        updateAction(tool)
    };

    const removeTool = () => {
        const url = `tools/${tool.id}`;

        apiRequest(url, 'DELETE')
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    };

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: updateTool
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: removeTool
    }

    return (
        <BaseCard
            mainText={tool.name}
            additionalText={[tool.description]}
            buttons={[btnEdit, btnRemove]}
        />
    )
}
