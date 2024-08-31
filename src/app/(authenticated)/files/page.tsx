"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import ConfirmDialog from "@/components/dialogs/confirmDialog";
import EmptyCard from "@/components/cards/emptyCard";
import FileCard from "@/components/cards/fileCard";
import FileForm from "@/components/forms/fileForm";
import FileInfo from "@/types/FileInfo";
import { useItems } from "@/contexts/itemsContext";
import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect } from "react";
import withAuthentication from "@/components/wrappers/withAuthentication";

function FilesView() {
    // Hooks for state variables
    const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
    const [modalState, setModalState] = useState({
        create: false,
        update: false,
        remove: false,
    });

    // Context
    const { showErrorDialog, showNotification } = useNotification();
    const { files, fetchFiles } = useItems();

    // Event handlers
    const handleModalToggle = (
        modalType: keyof typeof modalState,
        show: boolean,
        file: FileInfo | null = null
    ) => {
        setModalState((prevState) => ({
            ...prevState,
            [modalType]: show,
        }));
        setSelectedFile(file);
    };

    const removeFile = () => {
        if (!selectedFile) {
            handleModalToggle("remove", false);
            return;
        }

        const url = `files/${selectedFile.id}`;

        apiRequest(url, "DELETE")
            .then((response) => {
                showNotification(response.success);
                fetchFiles();
            })
            .catch((err) => showErrorDialog(err.message))
            .finally(() => handleModalToggle("remove", false));
    };

    // Action to execute at the beginning
    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const fileInfo = selectedFile ? { fileInfo: selectedFile } : {};

    return (
        <>
            <CardsList
                title="Archivos"
                addItemBtnText="Subir archivo"
                addItemBtnAction={() => handleModalToggle("create", true)}
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
                                onEdit={() => handleModalToggle("update", true, file)}
                                onRemove={() => handleModalToggle("remove", true, file)}
                            />
                        ))}
                    </>
                )}
            </CardsList>
            {(modalState.create || modalState.update) && (
                <FileForm
                    exitAction={() =>
                        handleModalToggle(modalState.create ? "create" : "update", false)
                    }
                    create={modalState.create}
                    {...fileInfo}
                />
            )}
            {modalState.remove && selectedFile && (
                <ConfirmDialog
                    title="Eliminar archivo"
                    text="¿Está seguro de que desea eliminar el archivo? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeFile}
                    onCancel={() => handleModalToggle("remove", false)}
                />
            )}
        </>
    );
}

export default withAuthentication(FilesView);
