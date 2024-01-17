import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import apiRequest from '../services/apiService';
import { getJwtToken } from '../services/storage';
import CardsList from '../components/containers/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import FileInfo from "../types/FileInfo";
import Material from "../types/Material";
import MessageDialog from '@/components/dialogs/messageDialog';
import { MessageDialogType } from '@/types/MessageDialogProps';
import Task from '../types/Task';
import TaskCard from '../components/cards/taskCard';
import TasksFilter from '../components/discrete/tasksFilter';
import TaskForm from '../components/forms/taskForm';
import Tool from "../types/Tool";

const DEFAULT_TASK_TYPES = ['on_hold', 'in_progress'];

export default function TasksView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [availableTools, setAvailableTools] = useState<Tool[]>([])
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([])
    const [availableFiles, setAvailableFiles] = useState<FileInfo[]>([])

    const [taskTypes, setTaskTypes] = useState<string[]>(DEFAULT_TASK_TYPES);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "tasks";
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

    /*  Function: showCreateTaskFormModal
    *   Description: Enables the modal to upload a new task
    */
    function showCreateTaskFormModal() {
        setShowTaskForm(true);
    }

    /*  Function: hideTaskFormModal
    *   Description: Disables the modal to upload a new task
    */
    function hideTaskFormModal() {
        setShowTaskForm(false);
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

    // Action to execute at the beginning
    useEffect(() => {
        if (!isValidated) { return; }

        apiRequest('files', 'GET')
            .then(data => {
                setAvailableFiles(data);
            })
            .catch(error => {
                showErrorDialog(error.message);
            });

        apiRequest('materials', 'GET')
            .then(data => {
                setAvailableMaterials(data);
            })
            .catch(error => {
                showErrorDialog(error.message);
            });

        apiRequest('tasks', 'GET')
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                showErrorDialog(error.message);
            });

        apiRequest('tools', 'GET')
            .then(data => {
                setAvailableTools(data);
            })
            .catch(error => {
                showErrorDialog(error.message);
            });
    }, [isValidated]);

    // Methods
    const updateTaskStatusList = (status: string, add: boolean) => {
        // Search for status
        const index = taskTypes.indexOf(status);

        // Add status
        if (add) {
            if (index !== -1) {
                return;
            }
            setTaskTypes(prevStatuses => [...prevStatuses, status]);
            return;
        }

        // Remove status
        if (index === -1) {
            return;
        }
        setTaskTypes((prevStatuses) =>
            prevStatuses.filter((element) => element !== status)
        );
    };

    return (
        <>
            <CardsList
                title='Tareas'
                addItemBtnText='Solicitar pedido'
                addItemBtnAction={showCreateTaskFormModal}
                showAddItemBtn
            >
                {tasks.length === 0 ? (
                    <EmptyCard itemName='tareas programadas' />
                ) : (
                    <>
                        <TasksFilter
                            filterStatus={taskTypes}
                            updateTaskStatusList={updateTaskStatusList}
                        />
                        {
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    show={taskTypes.includes(task.status)}
                                    toolsList={availableTools}
                                    materialsList={availableMaterials}
                                    filesList={availableFiles}
                                    setError={showErrorDialog}
                                    setNotification={showNotification}
                                />
                            ))
                        }
                    </>
                )
                }
            </CardsList>
            {showMessageDialog &&
                <MessageDialog
                    onClose={hideMessageDialog}
                    type={messageType}
                    title={messageTitle}
                    text={notification}
                />
            }
            {showTaskForm &&
                <TaskForm
                    exitAction={hideTaskFormModal}
                    create={true}
                    toolsList={availableTools}
                    materialsList={availableMaterials}
                    filesList={availableFiles}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            }
        </>
    )
}
