import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import apiRequest from '../services/apiService';
import { getJwtToken } from '../services/storage';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import FileCard from '../components/cards/fileCard';
import FileForm from '../components/forms/fileForm';
import FileInfo from '../types/FileInfo';
import MessageDialog from '@/components/dialogs/messageDialog';

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [showFileForm, setShowFileForm] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "files";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
        }

        apiRequest('users/auth', 'GET')
            .then((response) => {
                setIsValidated(true);
            })
            .catch(error => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*  Function: showCreateFileFormModal
    *   Description: Enables the modal to upload a new file
    */
    function showCreateFileFormModal() {
        setShowFileForm(true);
    }

    /*  Function: hideFileFormModal
    *   Description: Disables the modal to upload a new file
    */
    function hideFileFormModal() {
        setShowFileForm(false);
    }

    /*  Function: showErrorDialog
    *   Description: Shows a dialog with information about the error
    */
    function showErrorDialog(message: string) {
        setErrorMsg(message);
        setShowMessageDialog(true);
    }

    /*  Function: hideErrorDialog
    *   Description: Hides the dialog with information about the error
    */
    function hideErrorDialog() {
        setShowMessageDialog(false);
    }

    // Action to execute at the beginning
    useEffect(() => {
        if (!isValidated) { return; }

        apiRequest('files', 'GET')
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                showErrorDialog(error.message);
            });
    }, [isValidated]);

    return (
        <>
            <CardsList
                title="Archivos"
                addItemBtnText="Subir archivo"
                addItemBtnAction={showCreateFileFormModal}
                showAddItemBtn
            >
                {files.length === 0 ? (
                    <EmptyCard itemName="archivos guardados" />
                ) : (
                    <>
                        {
                            files.map((file) => (
                                <FileCard
                                    key={file.id}
                                    file={file}
                                    setError={showErrorDialog}
                                />
                            ))
                        }
                    </>
                )
                }
            </CardsList>
            {showMessageDialog &&
                <MessageDialog
                    onClose={hideErrorDialog}
                    type='error'
                    title='Error de base de datos'
                    text={errorMsg}
                />
            }
            {showFileForm &&
                <FileForm exitAction={hideFileFormModal} create={true} setError={showErrorDialog} />
            }
        </>
    )
}
