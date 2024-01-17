import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import apiRequest from '../services/apiService';
import { getJwtToken } from '../services/storage';
import CardsList from '../components/containers/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import MessageDialog from '@/components/dialogs/messageDialog';
import { MessageDialogType } from '@/types/MessageDialogProps';
import Task from '../types/Task';
import RequestCard from '../components/cards/requestCard';

export default function RequestsView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "requests";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
        }

        apiRequest('users/auth', 'GET')
            .then((response) => {
                setIsValidated(true);
            })
            .catch(error => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Action to execute at the beginning
    useEffect(() => {
        if (!isValidated) { return; }

        const url = 'tasks?status=pending_approval';

        apiRequest(url, 'GET')
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                showErrorDialog(error.message);
            });
    }, [isValidated]);

    /*  Function: showErrorDialog
    *   Description: Shows a dialog with information about the error
    */
    function showErrorDialog(message: string) {
        setNotification(message);
        setMessageType("error");
        setMessageTitle("Error de API");
        setShowMessageDialog(true);
    }

    /*  Function: showNotification
    *   Description: Shows a dialog with a notification
    */
    function showNotification(message: string) {
        setNotification(message);
        setMessageType("info");
        setMessageTitle("¡Éxito!");
        setShowMessageDialog(true);
    }

    /*  Function: hideMessageDialog
    *   Description: Hides the message dialog
    */
    function hideMessageDialog() {
        setShowMessageDialog(false);
    }

    return (
        <CardsList title="Solicitudes">
            {tasks.length === 0 ? (
                <EmptyCard itemName="solicitudes" />
            ) : (
                <>
                    {
                        tasks.map((task) => (
                            <RequestCard
                                key={task.id}
                                task={task}
                                setError={showErrorDialog}
                                setNotification={showNotification}
                            />
                        ))
                    }
                </>
            )
            }
            {showMessageDialog &&
                <MessageDialog
                    onClose={hideMessageDialog}
                    type={messageType}
                    title={messageTitle}
                    text={notification}
                />
            }
        </CardsList>
    )
}
