import { useState } from "react";
import apiRequest from "@/services/apiService";
import BaseForm from "./baseForm";
import Tool from "@/types/Tool";
import LabeledTextInput from "../discrete/labeledTextInput";
import { useNotification } from "@/contexts/notificationContext";
import { useItems } from "@/contexts/itemsContext";

export interface ToolFormProps {
    exitAction: () => void;
    create: boolean;
    toolInfo?: Tool;
}

const defaultToolInfo = {
    id: 0,
    name: "",
    description: "",
};

export default function ToolForm(props: ToolFormProps) {
    // Props
    const { exitAction, create, toolInfo = defaultToolInfo } = props;

    // Context
    const { showErrorDialog, showNotification } = useNotification();
    const { fetchTools } = useItems();

    // Hooks for state variables
    const [toolName, setToolName] = useState<string>(toolInfo.name);
    const [toolDescription, setToolDescription] = useState<string>(toolInfo.description);

    const handleToolNameChange = (name: string) => {
        setToolName(name);
    };

    const handleToolDescriptionChange = (description: string) => {
        setToolDescription(description);
    };

    const handleUploadClick = () => {
        const data = {
            name: toolName,
            description: toolDescription,
        };

        apiRequest("tools", "POST", data, true)
            .then((response) => {
                showNotification(response.success);
                fetchTools();
            })
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            name: toolName,
            description: toolDescription,
        };
        const url = `tools/${toolInfo.id}`;

        apiRequest(url, "PUT", data, true)
            .then((response) => {
                showNotification(response.success);
                fetchTools();
            })
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nueva herramienta" : "Editar herramienta"}
            subtitle=""
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText="Guardar"
        >
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledTextInput
                    label="Nombre"
                    name="tool-name"
                    placeholder=""
                    value={toolName}
                    handleChange={handleToolNameChange}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledTextInput
                    label="Descripción"
                    name="tool-description"
                    placeholder=""
                    value={toolDescription}
                    handleChange={handleToolDescriptionChange}
                />
            </div>
        </BaseForm>
    );
}
