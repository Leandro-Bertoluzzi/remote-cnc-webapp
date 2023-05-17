import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import FileCard from '../components/cards/fileCard';
import FileForm from '../components/forms/fileForm';
import FileInfo from '../types/FileInfo';

const EMPTY_FILE: FileInfo = {
    id: 0,
    file_name: "",
    created_at: ""
};

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [showFileForm, setShowFileForm] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [fileToUpdate, setFileToUpdate] = useState<FileInfo>(EMPTY_FILE);

    /*  Function: showCreateFileFormModal
    *   Description: Enables the modal to upload a new file
    */
    function  showCreateFileFormModal() {
        setIsCreate(true);
        setFileToUpdate(EMPTY_FILE);
        setShowFileForm(true);
    }

    /*  Function: showUpdateFileFormModal
    *   Description: Enables the modal to update an existing file
    */
    function showUpdateFileFormModal(file: FileInfo) {
        setIsCreate(false);
        setFileToUpdate(file);
        setShowFileForm(true);
    }

    /*  Function: hideFileFormModal
    *   Description: Disables the modal to upload a new file or update an existing one
    */
    function hideFileFormModal() {
        setShowFileForm(false);
    }

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest('files', 'GET')
        .then(data => {
            setFiles(data);
        })
        .catch(error => {
            console.log("Connection error: ", error.message);
        });
    }, []);

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
                                        updateAction={showUpdateFileFormModal}
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showFileForm &&
                <FileForm exitAction={hideFileFormModal} create={isCreate} fileInfo={fileToUpdate} />
            }
        </>
    )
}
