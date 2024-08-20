"use client";

import { ReactNode } from "react";
import MessageDialog from "../dialogs/messageDialog";
import { useNotification } from "@/contexts/notificationContext";

export default function NotificationsWrapper({ children }: { children: ReactNode }) {
    const { showMessageDialog, hideMessageDialog, messageType, messageTitle, notification } =
        useNotification();

    return (
        <>
            {children}
            {showMessageDialog && (
                <MessageDialog
                    onClose={hideMessageDialog}
                    type={messageType}
                    title={messageTitle}
                    text={notification}
                />
            )}
        </>
    );
}
