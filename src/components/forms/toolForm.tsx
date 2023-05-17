import { ChangeEvent, useState } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import ToolFormProps from '../../types/ToolFormProps';

export default function ToolForm(props: ToolFormProps) {
    // Props
    const { exitAction, create, toolInfo } = props;

    // Hooks for state variables
    const [toolName, setToolName] = useState<string>(toolInfo.name);
    const [toolDescription, setToolDescription] = useState<string>(toolInfo.description);

    const handleToolNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setToolName(e.target.value);
        }
    };

    const handleToolDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setToolDescription(e.target.value);
        }
    };

    const handleUploadClick = () => {
        const data = {
            "user_id": 1,
            "name": toolName,
            "description": toolDescription
        }

        apiRequest('tools', 'POST', JSON.stringify(data), true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            "user_id": 1,
            "name": toolName,
            "description": toolDescription
        }
        const url = `tools/${toolInfo.id}`;

        apiRequest(url, 'PUT', JSON.stringify(data), true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nueva herramienta" : "Editar herramienta"}
            subtitle=""
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText="Subir"
        >
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="tool-name-input">Nombre: </label>
                <input id="tool-name-input" type="text" onChange={handleToolNameChange} value={toolName} />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="tool-description-input">Descripción: </label>
                <input id="tool-description-input" type="text" onChange={handleToolDescriptionChange} value={toolDescription} />
            </div>
        </BaseForm>
    )
}
