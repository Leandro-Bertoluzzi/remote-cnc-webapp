import { useState } from 'react';
import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE } from '../cards/baseCard';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import ConfirmDialog from '../dialogs/confirmDialog';
import FileCardProps from '../../types/FileCardProps';
import FileForm from '../forms/fileForm';

export default function FileCard(props: FileCardProps) {
    // Props
    const { file, setError, setNotification } = props;

    // Hooks for state variables
    const [showFileForm, setShowFileForm] = useState<boolean>(false);
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);

    // Text
    const createdAt = new Date(file.created_at);
    const createdAtText = `Created at: ${createdAt.toLocaleString()}`;

    /*  Function: removeFile
    *   Description: Removes the current file
    */
    const removeFile = () => {
        hideRemoveConfirmationModal()

        const url = `files/${file.id}`;

        apiRequest(url, 'DELETE')
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: showUpdateFileFormModal
    *   Description: Enables the modal to update the file
    */
    function showUpdateFileFormModal() {
        setShowFileForm(true);
    }

    /*  Function: hideFileFormModal
    *   Description: Disables the modal to update the file
    */
    function hideFileFormModal() {
        setShowFileForm(false);
    }

    /*  Function: showRemoveConfirmationModal
    *   Description: Enables the modal to confirm the removal of the file
    */
    function showRemoveConfirmationModal() {
        setShowRemoveConfirmation(true);
    }

    /*  Function: hideRemoveConfirmationModal
    *   Description: Disables the modal to confirm the removal of the file
    */
    function hideRemoveConfirmationModal() {
        setShowRemoveConfirmation(false);
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
        action: showRemoveConfirmationModal
    }

    return (
        <>
            <BaseCard
                mainText={file.name}
                additionalText={[createdAtText]}
                buttons={[btnDownload, btnEdit, btnRemove]}
            />
            {showFileForm &&
                <FileForm
                    exitAction={hideFileFormModal}
                    create={false}
                    fileInfo={file}
                    setError={setError}
                    setNotification={setNotification}
                />
            }
            {showRemoveConfirmation &&
                <ConfirmDialog
                    title="Eliminar archivo"
                    text="¿Está seguro de que desea eliminar el archivo? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeFile}
                    onCancel={hideRemoveConfirmationModal}
                />
            }
        </>
    )
}
