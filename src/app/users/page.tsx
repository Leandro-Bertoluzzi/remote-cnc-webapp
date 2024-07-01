"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import Loader from "@/components/discrete/loader";
import MessageDialog from "@/components/dialogs/messageDialog";
import User from "@/types/User";
import UserCard from "@/components/cards/userCard";
import UserForm from "@/components/forms/userForm";
import { MessageDialogType } from "@/types/MessageDialogProps";
import useAuth from "@/hooks/useauth";
import { useState, useEffect } from "react";

export default function UsersView() {
    // Hooks for state variables
    const [users, setUsers] = useState<User[]>([]);
    const [showUserForm, setShowUserForm] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // User authentication
    const authorized = useAuth(true);

    // Actions
    const toggleFormModal = (show: boolean) => {
        setShowUserForm(show);
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

        apiRequest("users", "GET")
            .then((data) => {
                setUsers(data);
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
                title="Usuarios"
                addItemBtnText="Agregar usuario"
                addItemBtnAction={() => toggleFormModal(true)}
                showAddItemBtn
            >
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        setError={showErrorDialog}
                        setNotification={showNotification}
                    />
                ))}
            </CardsList>
            {showMessageDialog && (
                <MessageDialog
                    onClose={hideMessageDialog}
                    type={messageType}
                    title={messageTitle}
                    text={notification}
                />
            )}
            {showUserForm && (
                <UserForm
                    exitAction={() => toggleFormModal(false)}
                    create={true}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
        </>
    );
}
