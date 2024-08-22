import { useState } from "react";
import apiRequest from "@/services/apiService";
import BaseForm from "./baseForm";
import Material from "@/types/Material";
import LabeledTextInput from "../discrete/labeledTextInput";
import { useNotification } from "@/contexts/notificationContext";

export interface MaterialFormProps {
    exitAction: () => void;
    create: boolean;
    materialInfo?: Material;
}

const defaultMaterialInfo = {
    id: 0,
    name: "",
    description: "",
};

export default function MaterialForm(props: MaterialFormProps) {
    // Props
    const { exitAction, create, materialInfo = defaultMaterialInfo } = props;

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Hooks for state variables
    const [materialName, setMaterialName] = useState<string>(materialInfo.name);
    const [materialDescription, setMaterialDescription] = useState<string>(
        materialInfo.description
    );

    const handleMaterialNameChange = (name: string) => {
        setMaterialName(name);
    };

    const handleMaterialDescriptionChange = (description: string) => {
        setMaterialDescription(description);
    };

    const handleUploadClick = () => {
        const data = {
            name: materialName,
            description: materialDescription,
        };

        apiRequest("materials", "POST", data, true)
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            name: materialName,
            description: materialDescription,
        };
        const url = `materials/${materialInfo.id}`;

        apiRequest(url, "PUT", data, true)
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nuevo material" : "Editar material"}
            subtitle=""
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText="Guardar"
        >
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledTextInput
                    label="Nombre"
                    name="material-name"
                    placeholder=""
                    value={materialName}
                    handleChange={handleMaterialNameChange}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledTextInput
                    label="Descripción"
                    name="material-description"
                    placeholder=""
                    value={materialDescription}
                    handleChange={handleMaterialDescriptionChange}
                />
            </div>
        </BaseForm>
    );
}
