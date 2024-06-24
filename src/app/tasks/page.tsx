"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import EmptyCard from "@/components/cards/emptyCard";
import FileInfo from "@/types/FileInfo";
import Loader from "@/components/discrete/loader";
import Material from "@/types/Material";
import MessageDialog from "@/components/dialogs/messageDialog";
import { MessageDialogType } from "@/types/MessageDialogProps";
import Task from "@/types/Task";
import TaskCard from "@/components/cards/taskCard";
import TasksFilter from "@/components/discrete/tasksFilter";
import TaskForm from "@/components/forms/taskForm";
import Tool from "@/types/Tool";
import useAuth from "@/hooks/useauth";
import { useState, useEffect } from "react";

const DEFAULT_TASK_TYPES = ["pending_approval", "on_hold", "in_progress"];

export default function TasksView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [availableTools, setAvailableTools] = useState<Tool[]>([]);
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);
    const [availableFiles, setAvailableFiles] = useState<FileInfo[]>([]);

    const [taskTypes, setTaskTypes] = useState<string[]>(DEFAULT_TASK_TYPES);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // User authentication
    const authorized = useAuth();

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
        async function queryItems() {
            try {
                const files = await apiRequest("files", "GET");
                const materials = await apiRequest("materials", "GET");
                const tools = await apiRequest("tools", "GET");
                const tasks = await apiRequest("tasks", "GET");

                setAvailableFiles(files);
                setAvailableMaterials(materials);
                setAvailableTools(tools);
                setTasks(tasks);
            } catch (error) {
                if (error instanceof Error) {
                    showErrorDialog(error.message);
                }
            }
        }

        if (authorized) {
            queryItems();
        }
    }, [authorized]);

    // Methods
    const updateTaskStatusList = (status: string, add: boolean) => {
        // Search for status
        const index = taskTypes.indexOf(status);

        // Add status
        if (add) {
            if (index !== -1) {
                return;
            }
            setTaskTypes((prevStatuses) => [...prevStatuses, status]);
            return;
        }

        // Remove status
        if (index === -1) {
            return;
        }
        setTaskTypes((prevStatuses) => prevStatuses.filter((element) => element !== status));
    };

    return (
        <>
            {authorized ? (
                <CardsList
                    title="Tareas"
                    addItemBtnText="Crear tarea"
                    addItemBtnAction={showCreateTaskFormModal}
                    showAddItemBtn
                >
                    {tasks.length === 0 ? (
                        <EmptyCard itemName="tareas programadas" />
                    ) : (
                        <>
                            <TasksFilter
                                filterStatus={taskTypes}
                                updateTaskStatusList={updateTaskStatusList}
                            />
                            {tasks.map((task) => (
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
                            ))}
                        </>
                    )}
                </CardsList>
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
            {showTaskForm && (
                <TaskForm
                    exitAction={hideTaskFormModal}
                    create={true}
                    toolsList={availableTools}
                    materialsList={availableMaterials}
                    filesList={availableFiles}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
        </>
    );
}
