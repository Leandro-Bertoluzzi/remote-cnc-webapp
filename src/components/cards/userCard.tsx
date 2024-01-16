import { useState } from 'react';
import { BUTTON_EDIT, BUTTON_REMOVE } from '../cards/baseCard';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import UserCardProps from '../../types/UserCardProps';
import UserForm from '../forms/userForm';

export default function UserCard(props: UserCardProps) {
    const { user, setError } = props;

    // Text
    const roleText = `Role: ${user.role}`;

    // Hooks for state variables
    const [showUserForm, setShowUserForm] = useState<boolean>(false);

    /*  Function: removeUser
    *   Description: Removes the current user
    */
    const removeUser = () => {
        const url = `users/${user.id}`;

        apiRequest(url, 'DELETE')
            .then((response) => {
                console.log(response);
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

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateUserFormModal
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: removeUser
    }

    return (
        <>
            <BaseCard
                mainText={user.name}
                additionalText={[roleText, user.email]}
                buttons={[btnEdit, btnRemove]}
            />
            {showUserForm &&
                <UserForm setError={setError} exitAction={hideUserFormModal} create={false} userInfo={user} />
            }
        </>
    )
}
