import { useState } from 'react';
import { BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import ToolCardProps from '../../types/ToolCardProps';
import ToolForm from '../forms/toolForm';

export default function ToolCard(props: ToolCardProps) {
    // Props
    const { tool } = props;

    // Hooks for state variables
    const [showToolForm, setShowToolForm] = useState<boolean>(false);

    /*  Function: removeTool
    *   Description: Removes the current tool
    */
    const removeTool = () => {
        const url = `tools/${tool.id}`;

        apiRequest(url, 'DELETE')
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
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

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateToolFormModal
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: removeTool
    }

    return (
        <>
            <BaseCard
                mainText={tool.name}
                additionalText={[tool.description]}
                buttons={[btnEdit, btnRemove]}
            />
            {showToolForm &&
                <ToolForm exitAction={hideToolFormModal} create={false} toolInfo={tool} />
            }
        </>
    )
}
