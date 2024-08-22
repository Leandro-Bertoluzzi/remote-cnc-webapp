"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import ConfirmDialog from "@/components/dialogs/confirmDialog";
import EmptyCard from "@/components/cards/emptyCard";
import FileCard from "@/components/cards/fileCard";
import FileForm from "@/components/forms/fileForm";
import FileInfo from "@/types/FileInfo";
import Loader from "@/components/discrete/loader";
import useAuth from "@/hooks/useauth";
import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect } from "react";

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileInfo | undefined>(undefined);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);

    // User authentication
    const authorized = useAuth();

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Actions
    const toggleCreateModal = (show: boolean) => {
        setShowCreateForm(show);
    };

    const toggleUpdateModal = (show: boolean, file?: FileInfo) => {
        setShowUpdateForm(show);
        setSelectedFile(file);
    };

    const toggleRemoveConfirmation = (show: boolean, file?: FileInfo) => {
        setShowRemoveConfirmation(show);
        setSelectedFile(file);
    };

    const removeFile = () => {
        setShowRemoveConfirmation(false);

        if (!selectedFile) {
            setSelectedFile(undefined);
            return;
        }

        const url = `files/${selectedFile.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));

        setSelectedFile(undefined);
    };

    // Action to execute at the beginning
    useEffect(() => {
        const fetchFiles = () => {
            if (!authorized) {
                return;
            }

            apiRequest("files", "GET")
                .then((data) => setFiles(data))
                .catch((error) => showErrorDialog(error.message));
        };

        fetchFiles();
    }, [authorized]);

    if (!authorized) {
        return <Loader />;
    }

    return (
        <>
            <CardsList
                title="Archivos"
                addItemBtnText="Subir archivo"
                addItemBtnAction={() => toggleCreateModal(true)}
                showAddItemBtn
            >
                {files.length === 0 ? (
                    <EmptyCard itemName="archivos guardados" />
                ) : (
                    <>
                        {files.map((file) => (
                            <FileCard
                                key={file.id}
                                file={file}
                                onEdit={() => toggleUpdateModal(true, file)}
                                onRemove={() => toggleRemoveConfirmation(true, file)}
                            />
                        ))}
                    </>
                )}
            </CardsList>
            {showCreateForm && (
                <FileForm exitAction={() => toggleCreateModal(false)} create={true} />
            )}
            {showUpdateForm && selectedFile && (
                <FileForm
                    exitAction={() => toggleUpdateModal(false)}
                    create={false}
                    fileInfo={selectedFile}
                />
            )}
            {showRemoveConfirmation && selectedFile && (
                <ConfirmDialog
                    title="Eliminar archivo"
                    text="¿Está seguro de que desea eliminar el archivo? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeFile}
                    onCancel={() => toggleRemoveConfirmation(false)}
                />
            )}
        </>
    );
}
