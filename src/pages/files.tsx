import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import FileCard from '../components/cards/fileCard';
import FileForm from '../components/forms/fileForm';
import FileInfo from '../types/FileInfo';

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [showFileForm, setShowFileForm] = useState<boolean>(false);

    /*  Function: showCreateFileFormModal
    *   Description: Enables the modal to upload a new file
    */
    function  showCreateFileFormModal() {
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
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showFileForm &&
                <FileForm exitAction={hideFileFormModal} create={true} />
            }
        </>
    )
}
