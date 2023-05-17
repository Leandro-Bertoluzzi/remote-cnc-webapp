import { ChangeEvent, useState } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import FileFormProps from '../../types/FileFormProps';
import FileInput from '../fileInput';

export default function FileForm(props: FileFormProps) {
    // Props
    const { exitAction, create, fileInfo } = props;

    // Hooks for state variables
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>(fileInfo.file_name);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setFileName(e.target.value);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("user_id", "1");
        formData.append("file", file, fileName);

        apiRequest('files', 'POST', formData)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            "user_id": 1,
            "file_name": fileName
        }
        const url = `files/${fileInfo.id}`;

        apiRequest(url, 'PUT', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nuevo archivo" : "Editar archivo"}
            subtitle={create ? "Selecciona un archivo" : "Renombra tu archivo"}
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText="Subir"
        >
            {create &&
                <div className="mb-5 w-full overflow-x-auto">
                    <FileInput handleFileChange={handleFileChange} accept=".gcode, .txt" />
                </div>
            }
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="file-name-input">Nombre de archivo: </label>
                <input id="file-name-input" type="text" onChange={handleFileNameChange} value={fileName} />
            </div>
        </BaseForm>
    )
}

FileForm.defaultProps = {
    fileInfo: {
        id: 0,
        file_name: "",
        created_at: ""
    }
}
