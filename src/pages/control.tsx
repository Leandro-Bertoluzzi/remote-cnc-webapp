import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import apiRequest from "@/services/apiService";
import CodeEditor from "@/components/codeEditor";
import ControllerActions from "@/components/controllerActions";
import ControllerStatus from "@/components/controllerStatus";
import { getJwtToken } from "@/services/storage";
import Head from "next/head";
import MessageDialog from "@/components/dialogs/messageDialog";
import { MessageDialogType } from "@/types/MessageDialogProps";
import Terminal from "@/components/terminal";

export default function ControlView() {
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "control";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
            return;
        }

        apiRequest("users/auth", "GET")
            .then(() => {
                setIsValidated(true);
            })
            .catch(() => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        if (!isValidated) {
            return;
        }

        // API requests go here...
    }, [isValidated]);

    return (
        <>
            <Head>
                <title>Control manual</title>
                <meta name="description" content="Files management" />
            </Head>
            <section data-section-id="1" className="overflow-hidden py-4">
                <div className="container mx-auto px-4">
                    <div className="rounded-xl border bg-white p-4">
                        <h2 className="mb-4 text-center text-3xl font-semibold">Control manual</h2>
                        <div className="grid gap-2 lg:grid-cols-2">
                            <ControllerStatus />
                            <CodeEditor />
                            <ControllerActions />
                            <Terminal sender />
                        </div>
                    </div>
                </div>
            </section>
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
