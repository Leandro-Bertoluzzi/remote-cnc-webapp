import CodeEditor from "@/components/codeEditor";
import ControllerActions from "@/components/controllerActions";
import ControllerStatus from "@/components/controllerStatus";
import Head from "next/head";
import Loader from "@/components/discrete/loader";
import MessageDialog from "@/components/dialogs/messageDialog";
import { MessageDialogType } from "@/types/MessageDialogProps";
import Terminal from "@/components/terminal";
import useAuth from "@/hooks/useauth";
import { useState } from "react";

export default function ControlView() {
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // User authentication
    const authorized = useAuth();
    if (!authorized) {
        return <Loader />;
    }

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
