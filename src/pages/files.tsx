import { useState, useEffect } from 'react';
import FileCard from '../components/fileCard';
import CardsList from '../components/cardsList';
import FileInfo from '../types/FileInfo';
import EmptyCard from '../components/emptyCard';
import FileForm from '../components/fileForm';
import config from '../config';

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [showCreateFile, setShowCreateFile] = useState<boolean>(false);

    // Other constants
    const { API_PORT, API_HOST } = config;

    /*  Function: updateFiles
    *   Description: Initializes the array of files to display
    */
    function updateFiles() {
        const apiBaseUrl = `http://${API_HOST}:${API_PORT}`;

        fetch(`${apiBaseUrl}/files`)
            .then((res) => res.json())
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });
    }

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
    useEffect(() => updateFiles(), []);

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
