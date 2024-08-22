"use client";

import apiRequest from "@/services/apiService";
import CancelTaskForm from "@/components/forms/cancelTaskForm";
import CardsList from "@/components/containers/cardsList";
import ConfirmDialog from "@/components/dialogs/confirmDialog";
import EmptyCard from "@/components/cards/emptyCard";
import FileInfo from "@/types/FileInfo";
import Loader from "@/components/discrete/loader";
import Material from "@/types/Material";
import Task from "@/types/Task";
import TaskCard from "@/components/cards/taskCard";
import TasksFilter from "@/components/discrete/tasksFilter";
import TaskForm from "@/components/forms/taskForm";
import Tool from "@/types/Tool";
import useAuth from "@/hooks/useauth";
import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect } from "react";
import { TASK_APPROVED_STATUS, TASK_INITIAL_STATUS } from "@/components/cards/taskCard";

const DEFAULT_TASK_TYPES = ["pending_approval", "on_hold", "in_progress"];

type taskActionType = (task: Task) => void;

export default function TasksView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [availableTools, setAvailableTools] = useState<Tool[]>([]);
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);
    const [availableFiles, setAvailableFiles] = useState<FileInfo[]>([]);

    const [taskTypes, setTaskTypes] = useState<string[]>(DEFAULT_TASK_TYPES);
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showCancelForm, setShowCancelForm] = useState<boolean>(false);

    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmDialogTitle, setConfirmDialogTitle] = useState<string>("");
    const [confirmDialogText, setConfirmDialogText] = useState<string>("");
    const [onConfirmMethod, setOnConfirmMethod] = useState<taskActionType>(() => (task: Task) => {
        void task;
    });

    // User authentication
    const authorized = useAuth();

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Actions
    const toggleCreateModal = (show: boolean, task?: Task) => {
        setShowCreateForm(show);
        setSelectedTask(task);
    };

    const toggleUpdateModal = (show: boolean, task?: Task) => {
        setShowUpdateForm(show);
        setSelectedTask(task);
    };

    const toggleCancelForm = (show: boolean, task?: Task) => {
        setShowCancelForm(show);
        setSelectedTask(task);
    };

    const toggleConfirmation = (show: boolean, task?: Task) => {
        setShowConfirmation(show);
        setSelectedTask(task);
    };

    const confirmRemove = (task: Task) => {
        setConfirmDialogTitle("Eliminar tarea");
        setConfirmDialogText(
            "¿Está seguro de que desea eliminar la tarea? Esta acción no puede deshacerse"
        );
        setOnConfirmMethod(() => removeTask);
        toggleConfirmation(true, task);
    };

    const confirmRun = (task: Task) => {
        setConfirmDialogTitle("Ejecutar tarea");
        setConfirmDialogText("¿Desea ejecutar la tarea ahora?");
        setOnConfirmMethod(() => runTask);
        toggleConfirmation(true, task);
    };

    const confirmRestore = (task: Task) => {
        setConfirmDialogTitle("Restaurar tarea");
        setConfirmDialogText(
            "¿Realmente desea restaurar la tarea? \
            Esto la devolverá al estado inicial, pendiente de aprobación"
        );
        setOnConfirmMethod(() => restoreTask);
        toggleConfirmation(true, task);
    };

    const confirmApprove = (task: Task) => {
        setConfirmDialogTitle("Aprobar tarea");
        setConfirmDialogText("¿Está seguro de que desea aprobar la tarea?");
        setOnConfirmMethod(() => approveTask);
        toggleConfirmation(true, task);
    };

    const onConfirm = () => {
        setShowConfirmation(false);
        if (!selectedTask) {
            showErrorDialog("No hay tarea seleccionada");
            setSelectedTask(undefined);
            return;
        }
        onConfirmMethod(selectedTask);
        setSelectedTask(undefined);
    };

    // API requests
    const removeTask = (task: Task) => {
        const url = `tasks/${task.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));
    };

    const runTask = (task: Task) => {
        const url = `worker/task/${task.id}`;

        apiRequest(url, "POST")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));
    };

    const updateTaskStatus = (status: string, task: Task) => {
        const data = { status };
        const url = `tasks/${task.id}/status`;

        apiRequest(url, "PUT", data, true)
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));
    };

    const approveTask = (task: Task) => {
        updateTaskStatus(TASK_APPROVED_STATUS, task);
    };

    const restoreTask = (task: Task) => {
        updateTaskStatus(TASK_INITIAL_STATUS, task);
    };

    const togglePausedTask = () => {
        apiRequest("worker/pause", "GET")
            .then((response) => apiRequest(`worker/pause/${response.paused ? 0 : 1}`, "PUT"))
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));
    };

    // Action to execute at the beginning
    useEffect(() => {
        async function queryItems() {
            try {
                const [files, materials, tools, tasks] = await Promise.all([
                    apiRequest("files", "GET"),
                    apiRequest("materials", "GET"),
                    apiRequest("tools", "GET"),
                    apiRequest("tasks", "GET"),
                ]);

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

    if (!authorized) {
        return <Loader />;
    }

    return (
        <>
            <CardsList
                title="Tareas"
                addItemBtnText="Crear tarea"
                addItemBtnAction={() => toggleCreateModal(true, undefined)}
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
                                onEdit={() => toggleUpdateModal(true, task)}
                                onCancel={() => toggleCancelForm(true, task)}
                                onRemove={() => confirmRemove(task)}
                                onApprove={() => confirmApprove(task)}
                                onRestore={() => confirmRestore(task)}
                                onRun={() => confirmRun(task)}
                                onPause={() => togglePausedTask()}
                                onRetry={() => toggleCreateModal(true, task)}
                            />
                        ))}
                    </>
                )}
            </CardsList>
            {showCreateForm && (
                <TaskForm
                    exitAction={() => toggleCreateModal(false)}
                    create={true}
                    toolsList={availableTools}
                    materialsList={availableMaterials}
                    filesList={availableFiles}
                    taskInfo={selectedTask}
                />
            )}
            {showUpdateForm && selectedTask && (
                <TaskForm
                    exitAction={() => toggleUpdateModal(false)}
                    create={false}
                    toolsList={availableTools}
                    materialsList={availableMaterials}
                    filesList={availableFiles}
                    taskInfo={selectedTask}
                />
            )}
            {showConfirmation && selectedTask && (
                <ConfirmDialog
                    title={confirmDialogTitle}
                    text={confirmDialogText}
                    confirmText="Aceptar"
                    onAccept={onConfirm}
                    onCancel={() => toggleConfirmation(false)}
                />
            )}
            {showCancelForm && selectedTask && (
                <CancelTaskForm
                    exitAction={() => toggleCancelForm(false)}
                    taskInfo={selectedTask}
                />
            )}
        </>
    );
}
