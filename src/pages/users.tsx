import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import apiRequest from "../services/apiService";
import { getJwtToken } from "../services/storage";
import CardsList from "../components/containers/cardsList";
import MessageDialog from "@/components/dialogs/messageDialog";
import User from "../types/User";
import UserCard from "../components/cards/userCard";
import UserForm from "../components/forms/userForm";
import { MessageDialogType } from "@/types/MessageDialogProps";
import Head from "next/head";

export default function UsersView() {
    // Hooks for state variables
    const [users, setUsers] = useState<User[]>([]);
    const [showUserForm, setShowUserForm] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "users";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
            return;
        }

        apiRequest("users/auth", "GET")
            .then(() => {
                setIsValidated(true);
            })
            .catch(() => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*  Function: showCreateUserFormModal
     *   Description: Enables the modal to upload a new user
     */
    function showCreateUserFormModal() {
        setShowUserForm(true);
    }

    /*  Function: hideUserFormModal
     *   Description: Disables the modal to upload a new user
     */
    function hideUserFormModal() {
        setShowUserForm(false);
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
        if (!isValidated) {
            return;
        }

        apiRequest("users", "GET")
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                showErrorDialog(error.message);
            });
    }, [isValidated]);

    return (
        <>
            <Head>
                <title>Users</title>
                <meta name="description" content="Users management" />
            </Head>
            <CardsList
                title="Usuarios"
                addItemBtnText="Agregar usuario"
                addItemBtnAction={showCreateUserFormModal}
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
                    exitAction={hideUserFormModal}
                    create={true}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
        </>
    );
}
