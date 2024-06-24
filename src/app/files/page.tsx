"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import EmptyCard from "@/components/cards/emptyCard";
import FileCard from "@/components/cards/fileCard";
import FileForm from "@/components/forms/fileForm";
import FileInfo from "@/types/FileInfo";
import Loader from "@/components/discrete/loader";
import MessageDialog from "@/components/dialogs/messageDialog";
import { MessageDialogType } from "@/types/MessageDialogProps";
import useAuth from "@/hooks/useauth";
import { useState, useEffect } from "react";

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [showFileForm, setShowFileForm] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // User authentication
    const authorized = useAuth();

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
        setNotification(message);
        setMessageType("error");
        setMessageTitle("Error de API");
        setShowMessageDialog(true);
    }

    /*  Function: showNotification
     *   Description: Shows a dialog with a notification
     */
    function showNotification(message: string) {
        setNotification(message);
        setMessageType("info");
        setMessageTitle("¡Éxito!");
        setShowMessageDialog(true);
    }

    /*  Function: hideMessageDialog
     *   Description: Hides the message dialog
     */
    function hideMessageDialog() {
        setShowMessageDialog(false);
    }

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

    return (
        <>
            {authorized ? (
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
                            {files.map((file) => (
                                <FileCard
                                    key={file.id}
                                    file={file}
                                    setError={showErrorDialog}
                                    setNotification={showNotification}
                                />
                            ))}
                        </>
                    )}
                </CardsList>
            ) : (
                <Loader />
            )}
            {showMessageDialog && (
                <MessageDialog
                    onClose={hideMessageDialog}
                    type={messageType}
                    title={messageTitle}
                    text={notification}
                />
            )}
            {showFileForm && (
                <FileForm
                    exitAction={hideFileFormModal}
                    create={true}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
        </>
    );
}
