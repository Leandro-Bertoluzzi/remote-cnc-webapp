import { useState } from 'react';
import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE } from '../cards/baseCard';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import FileCardProps from '../../types/FileCardProps';
import FileForm from '../forms/fileForm';

export default function FileCard(props: FileCardProps) {
    // Props
    const { file, setError } = props;

    // Hooks for state variables
    const [showFileForm, setShowFileForm] = useState<boolean>(false);

    // Text
    const createdAt = new Date(file.created_at);
    const createdAtText = `Created at: ${createdAt.toLocaleString()}`;

    /*  Function: removeFile
    *   Description: Removes the current file
    */
    const removeFile = () => {
        const url = `files/${file.id}`;

        apiRequest(url, 'DELETE')
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: showUpdateFileFormModal
    *   Description: Enables the modal to update an existing file
    */
    function showUpdateFileFormModal() {
        setShowFileForm(true);
    }

    /*  Function: hideFileFormModal
    *   Description: Disables the modal to upload a new file or update an existing one
    */
    function hideFileFormModal() {
        setShowFileForm(false);
    }

    // Buttons
    const btnDownload: ButtonInfo = {
        type: BUTTON_DOWNLOAD,
        action: () => { console.log("Download file: ", file.id); }
    }
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateFileFormModal
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: removeFile
    }

    return (
        <>
            <BaseCard
                mainText={file.name}
                additionalText={[createdAtText]}
                buttons={[btnDownload, btnEdit, btnRemove]}
            />
            {showFileForm &&
                <FileForm setError={setError} exitAction={hideFileFormModal} create={false} fileInfo={file} />
            }
        </>
    )
}
