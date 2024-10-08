import { useState } from "react";
import apiRequest from "@/services/apiService";
import BaseForm from "./baseForm";
import { voidActionType } from "@/types/Actions";
import FileInfo from "@/types/FileInfo";
import LabeledTextInput from "../discrete/labeledTextInput";
import LabeledFileInput from "../discrete/labeledFileInput";
import { useItems } from "@/contexts/itemsContext";
import { useNotification } from "@/contexts/notificationContext";

export interface FileFormProps {
    exitAction: voidActionType;
    create: boolean;
    fileInfo?: FileInfo;
}

const defaultFileInfo = {
    id: 0,
    name: "",
    created_at: "",
};

export default function FileForm(props: FileFormProps) {
    // Props
    const { exitAction, create, fileInfo = defaultFileInfo } = props;

    // Context
    const { showErrorDialog, showNotification } = useNotification();
    const { fetchFiles } = useItems();

    // Hooks for state variables
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>(fileInfo.name);

    const handleFileChange = (selectedFile: File) => {
        setFile(selectedFile);
        setFileName(selectedFile.name);
    };

    const handleFileNameChange = (name: string) => {
        setFileName(name);
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        /*
        if(this.files[0].size > FILE_SIZE_LIMIT) {
            // SHOW AN ERROR MESSAGE
            return;
        }
        */

        const formData = new FormData();
        formData.append("file", file, fileName);

        apiRequest("files", "POST", formData)
            .then((response) => {
                showNotification(response.success);
                fetchFiles();
            })
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            file_name: fileName,
        };
        const url = `files/${fileInfo.id}`;

        apiRequest(url, "PUT", data, true)
            .then((response) => {
                showNotification(response.success);
                fetchFiles();
            })
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nuevo archivo" : "Editar archivo"}
            subtitle={create ? "Selecciona un archivo" : "Renombra tu archivo"}
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText={create ? "Subir" : "Actualizar"}
        >
            {create && (
                <div className="mb-5 w-full overflow-x-auto">
                    <LabeledFileInput
                        label="Archivo"
                        name="file-upload"
                        handleChange={handleFileChange}
                        helperText=""
                        accept=".gcode, .nc, .txt"
                    />
                </div>
            )}
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledTextInput
                    label="Nombre de archivo"
                    name="file-name"
                    placeholder=""
                    value={fileName}
                    handleChange={handleFileNameChange}
                />
            </div>
        </BaseForm>
    );
}
