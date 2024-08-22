"use client";

import { createContext, ReactNode, useContext, useState, useCallback } from "react";
import { MessageDialogType } from "@/types/MessageDialogProps";

interface NotificationContextProps {
    showErrorDialog: (message: string) => void;
    showNotification: (message: string) => void;
    hideMessageDialog: () => void;
    showMessageDialog: boolean;
    notification: string;
    messageType: MessageDialogType;
    messageTitle: string;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("info");
    const [messageTitle, setMessageTitle] = useState<string>("");

    const showErrorDialog = useCallback((message: string, title = "Hubo un error") => {
        setNotification(message);
        setMessageType("error");
        setMessageTitle(title);
        setShowMessageDialog(true);
    }, []);

    const showNotification = useCallback((message: string, title = "¡Éxito!") => {
        setNotification(message);
        setMessageType("info");
        setMessageTitle(title);
        setShowMessageDialog(true);
    }, []);

    const hideMessageDialog = useCallback(() => {
        setShowMessageDialog(false);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                showErrorDialog,
                showNotification,
                hideMessageDialog,
                showMessageDialog,
                notification,
                messageType,
                messageTitle,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification(): NotificationContextProps {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
}
