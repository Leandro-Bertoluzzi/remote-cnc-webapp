import { useState } from "react";
import { BUTTON_EDIT, BUTTON_REMOVE } from "../discrete/cardButton";
import apiRequest from "@/services/apiService";
import ButtonInfo from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import ConfirmDialog from "../dialogs/confirmDialog";
import User from "@/types/User";
import UserForm from "../forms/userForm";

export interface UserCardProps {
    user: User;
    setError: (message: string) => void;
    setNotification: (message: string) => void;
}

export default function UserCard(props: UserCardProps) {
    const { user, setError, setNotification } = props;

    // Text
    const roleText = `Role: ${user.role}`;

    // Hooks for state variables
    const [showUserForm, setShowUserForm] = useState<boolean>(false);
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);

    /*  Function: removeUser
     *   Description: Removes the current user
     */
    const removeUser = () => {
        hideRemoveConfirmationModal();

        const url = `users/${user.id}`;

        apiRequest(url, "DELETE")
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: showUpdateUserFormModal
     *   Description: Enables the modal to update the current user
     */
    function showUpdateUserFormModal() {
        setShowUserForm(true);
    }

    /*  Function: hideUserFormModal
     *   Description: Disables the modal to update the current user
     */
    function hideUserFormModal() {
        setShowUserForm(false);
    }

    /*  Function: showRemoveConfirmationModal
     *   Description: Enables the modal to confirm the removal of the file
     */
    function showRemoveConfirmationModal() {
        setShowRemoveConfirmation(true);
    }

    /*  Function: hideRemoveConfirmationModal
     *   Description: Disables the modal to confirm the removal of the file
     */
    function hideRemoveConfirmationModal() {
        setShowRemoveConfirmation(false);
    }

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateUserFormModal,
    };
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: showRemoveConfirmationModal,
    };

    return (
        <>
            <BaseCard
                mainText={user.name}
                additionalText={[roleText, user.email]}
                buttons={[btnEdit, btnRemove]}
            />
            {showUserForm && (
                <UserForm
                    exitAction={hideUserFormModal}
                    create={false}
                    userInfo={user}
                    setError={setError}
                    setNotification={setNotification}
                />
            )}
            {showRemoveConfirmation && (
                <ConfirmDialog
                    title="Eliminar usuario"
                    text="¿Está seguro de que desea eliminar el usuario? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeUser}
                    onCancel={hideRemoveConfirmationModal}
                />
            )}
        </>
    );
}
