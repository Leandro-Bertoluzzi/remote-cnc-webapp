import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import User from '../types/User';
import UserCard from '../components/cards/userCard';
import UserForm from '../components/forms/userForm';

export default function UsersView() {
    // Hooks for state variables
    const [users, setUsers] = useState<User[]>([]);
    const [showUserForm, setShowUserForm] = useState<boolean>(false);

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

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest('users', 'GET')
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });
    }, []);

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
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showUserForm &&
                <UserForm exitAction={hideUserFormModal} create={true} />
            }
        </>
    )
}
