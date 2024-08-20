"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
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
    const [showUserForm, setShowUserForm] = useState<boolean>(false);

    // User authentication
    const authorized = useAuth(true);

    // Context
    const { showErrorDialog } = useNotification();

    // Actions
    const toggleFormModal = (show: boolean) => {
        setShowUserForm(show);
    };

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
                    <UserCard key={user.id} user={user} />
                ))}
            </CardsList>
            {showUserForm && <UserForm exitAction={() => toggleFormModal(false)} create={true} />}
        </>
    );
}
