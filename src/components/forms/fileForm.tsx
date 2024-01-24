import { useState } from "react";
import apiRequest from "../../services/apiService";
import BaseForm from "./baseForm";
import FileFormProps from "../../types/FileFormProps";
import LabeledTextInput from "../discrete/labeledTextInput";
import LabeledFileInput from "../discrete/labeledFileInput";

export default function FileForm(props: FileFormProps) {
    // Props
    const { exitAction, create, fileInfo, setError, setNotification } = props;

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
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            name: fileName,
        };
        const url = `files/${fileInfo.id}`;

        apiRequest(url, "PUT", data, true)
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });

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

FileForm.defaultProps = {
    fileInfo: {
        id: 0,
        name: "",
        created_at: "",
    },
};
