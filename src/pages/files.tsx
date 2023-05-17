import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/emptyCard';
import FileCard from '../components/fileCard';
import FileForm from '../components/fileForm';
import FileInfo from '../types/FileInfo';

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [showCreateFile, setShowCreateFile] = useState<boolean>(false);

    /*  Function: showCreateUserModal
    *   Description: Enables the modal to upload a new file
    */
    function showCreateUserModal() {
        setShowCreateFile(true);
    }

    /*  Function: hideCreateUserModal
    *   Description: Disables the modal to upload a new file
    */
    function hideCreateUserModal() {
        setShowCreateFile(false);
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
                addItemBtnAction={showCreateUserModal}
                showAddItemBtn
            >
                {files.length === 0 ? (
                    <EmptyCard itemName="archivos guardados" />
                ) : (
                        <>
                            {
                                files.map((file) => (
                                    <FileCard key={file.id} file={file} />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showCreateFile &&
                <FileForm exitAction={hideCreateUserModal} />
            }
        </>
    )
}
