"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
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
    const [showFileForm, setShowFileForm] = useState<boolean>(false);

    // User authentication
    const authorized = useAuth();

    // Context
    const { showErrorDialog } = useNotification();

    // Actions
    const toggleFormModal = (show: boolean) => {
        setShowFileForm(show);
    };

    // Action to execute at the beginning
    useEffect(() => {
        if (!authorized) {
            return;
        }

        apiRequest("files", "GET")
            .then((data) => {
                setFiles(data);
            })
            .catch((error) => {
                showErrorDialog(error.message);
            });
    }, [authorized]);

    if (!authorized) {
        return <Loader />;
    }

    return (
        <>
            <CardsList
                title="Archivos"
                addItemBtnText="Subir archivo"
                addItemBtnAction={() => toggleFormModal(true)}
                showAddItemBtn
            >
                {files.length === 0 ? (
                    <EmptyCard itemName="archivos guardados" />
                ) : (
                    <>
                        {files.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </>
                )}
            </CardsList>
            {showFileForm && <FileForm exitAction={() => toggleFormModal(false)} create={true} />}
        </>
    );
}
