import { ChangeEvent, useState } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import MaterialFormProps from '../../types/MaterialFormProps';

export default function MaterialForm(props: MaterialFormProps) {
    // Props
    const { exitAction, create, materialInfo } = props;

    // Hooks for state variables
    const [materialName, setMaterialName] = useState<string>(materialInfo.name);
    const [materialDescription, setMaterialDescription] = useState<string>(materialInfo.description);

    const handleMaterialNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setMaterialName(e.target.value);
        }
    };

    const handleMaterialDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setMaterialDescription(e.target.value);
        }
    };

    const handleUploadClick = () => {
        const data = {
            "user_id": 1,
            "name": materialName,
            "description": materialDescription
        }

        apiRequest('materials', 'POST', JSON.stringify(data), true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            "user_id": 1,
            "name": materialName,
            "description": materialDescription
        }
        const url = `materials/${materialInfo.id}`;

        apiRequest(url, 'PUT', JSON.stringify(data), true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nuevo material" : "Editar material"}
            subtitle=""
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText="Subir"
        >
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="material-name-input">Nombre: </label>
                <input id="material-name-input" type="text" onChange={handleMaterialNameChange} value={materialName} />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="material-description-input">Descripción: </label>
                <input id="material-description-input" type="text" onChange={handleMaterialDescriptionChange} value={materialDescription} />
            </div>
        </BaseForm>
    )
}
