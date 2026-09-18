"use client";

import { ItemsClient } from "@/application/items/itemsClient";
import { createItemsClient } from "@/infrastructure/clients/itemsClient";
import FileInfo from "@/types/FileInfo";
import Material from "@/types/Material";
import Task from "@/types/Task";
import Tool from "@/types/Tool";
import User from "@/types/User";
import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useNotification } from "./notificationContext";

interface ItemsContextProps {
    fetchFiles: () => void;
    files: FileInfo[];
    fetchMaterials: () => void;
    materials: Material[];
    fetchTasks: (request_items?: boolean) => void;
    tasks: Task[];
    fetchTools: () => void;
    tools: Tool[];
    fetchUsers: () => void;
    users: User[];
}

export const ItemsContext = createContext<ItemsContextProps | undefined>(undefined);

interface ItemsProviderProps {
    children: ReactNode;
    client?: ItemsClient;
}

const defaultClient = createItemsClient();

export const ItemsProvider = ({ children, client = defaultClient }: ItemsProviderProps) => {
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tools, setTools] = useState<Tool[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    // Context
    const { showErrorDialog } = useNotification();

    // Private methods
    const queryTaskItems = useCallback(async () => {
        try {
            const [_files, _materials, _tools] = await Promise.all([
                client.getFiles(),
                client.getMaterials(),
                client.getTools(),
            ]);
            setFiles(_files);
            setMaterials(_materials);
            setTools(_tools);
        } catch (error) {
            if (error instanceof Error) {
                showErrorDialog(error.message);
            }
        }
    }, [client, showErrorDialog]);

    // Shared methods
    const fetchFiles = useCallback(() => {
        client.getFiles()
            .then(setFiles)
            .catch((error) => showErrorDialog(error.message));
    }, [client, showErrorDialog]);

    const fetchMaterials = useCallback(() => {
        client.getMaterials()
            .then(setMaterials)
            .catch((error) => showErrorDialog(error.message));
    }, [client, showErrorDialog]);

    const fetchTasks = useCallback(
        (request_items = false) => {
            if (request_items) {
                queryTaskItems();
            }

            client.getTasks()
                .then(setTasks)
                .catch((error) => showErrorDialog(error.message));
        },
        [client, queryTaskItems, showErrorDialog]
    );

    const fetchTools = useCallback(() => {
        client.getTools()
            .then(setTools)
            .catch((error) => showErrorDialog(error.message));
    }, [client, showErrorDialog]);

    const fetchUsers = useCallback(() => {
        client.getUsers()
            .then(setUsers)
            .catch((error) => showErrorDialog(error.message));
    }, [client, showErrorDialog]);

    return (
        <ItemsContext.Provider
            value={{
                files,
                fetchFiles,
                materials,
                fetchMaterials,
                tasks,
                fetchTasks,
                tools,
                fetchTools,
                users,
                fetchUsers,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
};

export function useItems(): ItemsContextProps {
    const context = useContext(ItemsContext);
    if (!context) {
        throw new Error("useItems must be used within a ItemsProvider");
    }
    return context;
}
