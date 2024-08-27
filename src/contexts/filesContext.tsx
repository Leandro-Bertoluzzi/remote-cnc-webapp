"use client";

import apiRequest from "@/services/apiService";
import FileInfo from "@/types/FileInfo";
import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useNotification } from "./notificationContext";

interface FilesContextProps {
    fetchFiles: () => void;
    files: FileInfo[];
}

export const FilesContext = createContext<FilesContextProps | undefined>(undefined);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<FileInfo[]>([]);

    // Context
    const { showErrorDialog } = useNotification();

    const fetchFiles = useCallback(() => {
        apiRequest("files", "GET")
            .then(setFiles)
            .catch((error) => showErrorDialog(error.message));
    }, [showErrorDialog]);

    return <FilesContext.Provider value={{ files, fetchFiles }}>{children}</FilesContext.Provider>;
};

export function useFiles(): FilesContextProps {
    const context = useContext(FilesContext);
    if (!context) {
        throw new Error("useFiles must be used within a FilesProvider");
    }
    return context;
}
