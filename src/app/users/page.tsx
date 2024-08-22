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
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [modalState, setModalState] = useState({
        create: false,
        update: false,
        remove: false,
    });

    // User authentication
    const authorized = useAuth(true);

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Event handlers
    const handleModalToggle = (
        modalType: keyof typeof modalState,
        show: boolean,
        user: User | null = null
    ) => {
        setModalState((prevState) => ({
            ...prevState,
            [modalType]: show,
        }));
        setSelectedUser(user);
    };

    const removeUser = () => {
        if (!selectedUser) {
            handleModalToggle("remove", false);
            return;
        }

        const url = `users/${selectedUser.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message))
            .finally(() => handleModalToggle("remove", false));
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

    const userInfo = selectedUser ? { userInfo: selectedUser } : {};

    return (
        <>
            <CardsList
                title="Usuarios"
                addItemBtnText="Agregar usuario"
                addItemBtnAction={() => handleModalToggle("create", true)}
                showAddItemBtn
            >
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={() => handleModalToggle("update", true, user)}
                        onRemove={() => handleModalToggle("remove", true, user)}
                    />
                ))}
            </CardsList>
            {(modalState.create || modalState.update) && (
                <UserForm
                    exitAction={() =>
                        handleModalToggle(modalState.create ? "create" : "update", false)
                    }
                    create={modalState.create}
                    {...userInfo}
                />
            )}
            {modalState.remove && selectedUser && (
                <ConfirmDialog
                    title="Eliminar usuario"
                    text="¿Está seguro de que desea eliminar el usuario? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeUser}
                    onCancel={() => handleModalToggle("remove", false)}
                />
            )}
        </>
    );
}
