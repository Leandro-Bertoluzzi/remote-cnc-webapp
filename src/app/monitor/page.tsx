"use client";

import apiRequest from "@/services/apiService";
import CameraWidget from "@/components/discrete/cameraWidget";
import ControllerStatus from "@/components/controllerStatus";
import Loader from "@/components/discrete/loader";
import Log from "@/types/Log";
import LogsViewer from "@/components/discrete/logsViewer";
import MessageDialog from "@/components/dialogs/messageDialog";
import { MessageDialogType } from "@/types/MessageDialogProps";
import Terminal from "@/components/terminal";
import useAuth from "@/hooks/useauth";
import { useState, useEffect } from "react";

export default function MonitorView() {
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");
    const [logs, setLogs] = useState<Log[]>([]);

    // User authentication
    const authorized = useAuth();

    /*  Function: showErrorDialog
     *   Description: Shows a dialog with information about the error
     */
    function showErrorDialog(message: string) {
        setNotification(message);
        setMessageType("error");
        setMessageTitle("Error de API");
        setShowMessageDialog(true);
    }

    /*  Function: hideMessageDialog
     *   Description: Hides the message dialog
     */
    function hideMessageDialog() {
        setShowMessageDialog(false);
    }

    // Action to execute at the beginning
    useEffect(() => {
        if (!authorized) {
            return;
        }

        apiRequest("monitor/logs", "GET")
            .then((data) => {
                setLogs(data);
            })
            .catch((error) => {
                showErrorDialog("Error solicitando registros: " + error.message);
            });
    }, [authorized]);

    return (
        <>
            {authorized ? (
                <section data-section-id="1" className="overflow-hidden py-4">
                    <div className="container mx-auto px-4">
                        <div className="rounded-xl border bg-white p-4">
                            <h2 className="mb-4 text-center text-3xl font-semibold">Monitor</h2>
                            <div className="grid gap-2 lg:grid-cols-2">
                                <ControllerStatus />
                                <Terminal />
                                <CameraWidget />
                                <LogsViewer logs={logs} />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <Loader />
            )}
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
