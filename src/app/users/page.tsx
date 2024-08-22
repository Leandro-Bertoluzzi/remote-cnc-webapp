"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import ConfirmDialog from "@/components/dialogs/confirmDialog";
import Loader from "@/components/discrete/loader";
import User from "@/types/User";
import UserCard from "@/components/cards/userCard";
import UserForm from "@/components/forms/userForm";
import useAuth from "@/hooks/useauth";
import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect } from "react";

export default function UsersView() {
    // Hooks for state variables
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState<boolean>(false);

    // User authentication
    const authorized = useAuth(true);

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Actions
    const toggleCreateModal = (show: boolean) => {
        setShowCreateForm(show);
    };

    const toggleUpdateModal = (show: boolean, user?: User) => {
        setShowUpdateForm(show);
        setSelectedUser(user);
    };

    const toggleRemoveConfirmation = (show: boolean, user?: User) => {
        setShowRemoveConfirmation(show);
        setSelectedUser(user);
    };

    const removeUser = () => {
        setShowRemoveConfirmation(false);

        if (!selectedUser) {
            setSelectedUser(undefined);
            return;
        }

        const url = `users/${selectedUser.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));

        setSelectedUser(undefined);
    };

    // Action to execute at the beginning
    useEffect(() => {
        const fetchUsers = () => {
            if (!authorized) {
                return;
            }

            apiRequest("users", "GET")
                .then((data) => setUsers(data))
                .catch((error) => showErrorDialog(error.message));
        };

        fetchUsers();
    }, [authorized]);

    if (!authorized) {
        return <Loader />;
    }

    return (
        <>
            <CardsList
                title="Usuarios"
                addItemBtnText="Agregar usuario"
                addItemBtnAction={() => toggleCreateModal(true)}
                showAddItemBtn
            >
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={() => toggleUpdateModal(true, user)}
                        onRemove={() => toggleRemoveConfirmation(true, user)}
                    />
                ))}
            </CardsList>
            {showCreateForm && (
                <UserForm exitAction={() => toggleCreateModal(false)} create={true} />
            )}
            {showUpdateForm && selectedUser && (
                <UserForm
                    exitAction={() => toggleUpdateModal(false)}
                    create={false}
                    userInfo={selectedUser}
                />
            )}
            {showRemoveConfirmation && selectedUser && (
                <ConfirmDialog
                    title="Eliminar usuario"
                    text="¿Está seguro de que desea eliminar el usuario? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeUser}
                    onCancel={() => toggleRemoveConfirmation(false)}
                />
            )}
        </>
    );
}
