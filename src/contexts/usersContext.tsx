"use client";

import apiRequest from "@/services/apiService";
import User from "@/types/User";
import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useNotification } from "./notificationContext";

interface UsersContextProps {
    fetchUsers: () => void;
    users: User[];
}

export const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);

    // Context
    const { showErrorDialog } = useNotification();

    const fetchUsers = useCallback(() => {
        apiRequest("users", "GET")
            .then(setUsers)
            .catch((error) => showErrorDialog(error.message));
    }, [showErrorDialog]);

    return <UsersContext.Provider value={{ users, fetchUsers }}>{children}</UsersContext.Provider>;
};

export function useUsers(): UsersContextProps {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers must be used within a UsersProvider");
    }
    return context;
}
