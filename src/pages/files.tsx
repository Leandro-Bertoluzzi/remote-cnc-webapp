import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import config from '../config';
import EmptyCard from '../components/cards/emptyCard';
import FileCard from '../components/cards/fileCard';
import FileForm from '../components/forms/fileForm';
import FileInfo from '../types/FileInfo';

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [showFileForm, setShowFileForm] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        if (isValidated) { return; }

        const { JWT_NAME } = config;
        const callbackUrl = "files";
        const token = localStorage.getItem(JWT_NAME);

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
        }

        apiRequest('users/auth', 'GET')
            .then((response) => {
                if (response.data) {
                    setIsValidated(true);
                }
                if (response.error) {
                    router.push(`/login?callbackUrl=${callbackUrl}`);
                }
            })
            .catch(error => router.push(`/login?callbackUrl=${callbackUrl}`));
    }, []);

    /*  Function: showCreateFileFormModal
    *   Description: Enables the modal to upload a new file
    */
    function  showCreateFileFormModal() {
        setShowFileForm(true);
    }

    /*  Function: hideFileFormModal
    *   Description: Disables the modal to upload a new file
    */
    function hideFileFormModal() {
        setShowFileForm(false);
    }

    // Action to execute at the beginning
    useEffect(() => {
        if (!isValidated) { return; }

        apiRequest('files', 'GET')
        .then(data => {
            setFiles(data);
        })
        .catch(error => {
            console.log("Connection error: ", error.message);
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
