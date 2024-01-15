import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import apiRequest from '../services/apiService';
import { getJwtToken } from '../services/storage';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import MessageDialog from '@/components/dialogs/messageDialog';
import User from '../types/User';
import UserCard from '../components/cards/userCard';
import UserForm from '../components/forms/userForm';

export default function UsersView() {
    // Hooks for state variables
    const [users, setUsers] = useState<User[]>([]);
    const [showUserForm, setShowUserForm] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "users";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
        }

        apiRequest('users/auth', 'GET')
            .then((response) => {
                setIsValidated(true);
            })
            .catch(error => router.push(`/login?callbackUrl=${callbackUrl}`));
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
        setErrorMsg(message);
        setShowMessageDialog(true);
    }

    /*  Function: hideErrorDialog
    *   Description: Hides the dialog with information about the error
    */
    function hideErrorDialog() {
        setShowMessageDialog(false);
    }

    // Action to execute at the beginning
    useEffect(() => {
        if (!isValidated) { return; }

        apiRequest('users', 'GET')
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                showErrorDialog(error.message);
            });
    }, [isValidated]);

    return (
        <>
            <CardsList
                title="Usuarios"
                addItemBtnText="Agregar usuario"
                addItemBtnAction={showCreateUserFormModal}
                showAddItemBtn
            >
                {users.length === 0 ? (
                    <EmptyCard itemName="usuarios registrados" />
                ) : (
                        <>
                            {
                                users.map((user) => (
                                    <UserCard
                                        key={user.id}
                                        user={user}
                                        setError={showErrorDialog}
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showMessageDialog &&
                <MessageDialog
                    onClose={hideErrorDialog}
                    type='error'
                    title='Error de base de datos'
                    text={errorMsg}
                />
            }
            {showUserForm &&
                <UserForm exitAction={hideUserFormModal} create={true} setError={showErrorDialog} />
            }
        </>
    )
}
