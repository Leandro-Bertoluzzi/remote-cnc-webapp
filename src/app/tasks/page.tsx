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
import { useState, useEffect, useCallback } from "react";
import { TASK_APPROVED_STATUS, TASK_INITIAL_STATUS } from "@/components/cards/taskCard";

const DEFAULT_TASK_TYPES = ["pending_approval", "on_hold", "in_progress"];

export default function TasksView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [availableTools, setAvailableTools] = useState<Tool[]>([]);
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);
    const [availableFiles, setAvailableFiles] = useState<FileInfo[]>([]);

    const [taskTypes, setTaskTypes] = useState<string[]>(DEFAULT_TASK_TYPES);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [modalState, setModalState] = useState({
        create: false,
        update: false,
        cancel: false,
        confirmation: false,
    });

    const [confirmDialogInfo, setConfirmDialogInfo] = useState({
        title: "",
        text: "",
        onConfirm: () => {
            return;
        },
    });

    // User authentication
    const authorized = useAuth();

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Event handlers
    const toggleModal = (
        modalType: keyof typeof modalState,
        show: boolean,
        task: Task | null = null
    ) => {
        setModalState((prevState) => ({
            ...prevState,
            [modalType]: show,
        }));
        setSelectedTask(task);
    };

    const setConfirmationDialog = (title: string, text: string, action: () => void, task: Task) => {
        setConfirmDialogInfo({ title, text, onConfirm: action });
        toggleModal("confirmation", true, task);
    };

    const onConfirm = () => {
        confirmDialogInfo.onConfirm();
        toggleModal("confirmation", false);
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
    const queryItems = useCallback(async () => {
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
    }, [showErrorDialog]);

    useEffect(() => {
        if (authorized) {
            queryItems();
        }
    }, [authorized, queryItems]);

    // Methods
    const updateTaskStatusList = (status: string, add: boolean) => {
        setTaskTypes((prevStatuses) => {
            if (add) {
                return prevStatuses.includes(status) ? prevStatuses : [...prevStatuses, status];
            } else {
                return prevStatuses.filter((s) => s !== status);
            }
        });
    };

    if (!authorized) {
        return <Loader />;
    }

    const taskInfo = selectedTask ? { taskInfo: selectedTask } : {};

    return (
        <>
            <CardsList
                title="Tareas"
                addItemBtnText="Crear tarea"
                addItemBtnAction={() => toggleModal("create", true)}
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
                                onEdit={() => toggleModal("update", true, task)}
                                onCancel={() => toggleModal("cancel", true, task)}
                                onRemove={() =>
                                    setConfirmationDialog(
                                        "Eliminar tarea",
                                        "¿Está seguro de que desea eliminar la tarea? Esta acción no puede deshacerse",
                                        () => removeTask(task),
                                        task
                                    )
                                }
                                onApprove={() =>
                                    setConfirmationDialog(
                                        "Aprobar tarea",
                                        "¿Está seguro de que desea aprobar la tarea?",
                                        () => approveTask(task),
                                        task
                                    )
                                }
                                onRestore={() =>
                                    setConfirmationDialog(
                                        "Restaurar tarea",
                                        "¿Realmente desea restaurar la tarea? Esto la devolverá al estado inicial, pendiente de aprobación",
                                        () => restoreTask(task),
                                        task
                                    )
                                }
                                onRun={() =>
                                    setConfirmationDialog(
                                        "Ejecutar tarea",
                                        "¿Desea ejecutar la tarea ahora?",
                                        () => runTask(task),
                                        task
                                    )
                                }
                                onPause={() => togglePausedTask()}
                                onRetry={() => toggleModal("create", true, task)}
                            />
                        ))}
                    </>
                )}
            </CardsList>
            {(modalState.create || modalState.update) && (
                <TaskForm
                    exitAction={() => toggleModal(modalState.create ? "create" : "update", false)}
                    create={modalState.create}
                    toolsList={availableTools}
                    materialsList={availableMaterials}
                    filesList={availableFiles}
                    {...taskInfo}
                />
            )}
            {modalState.confirmation && selectedTask && (
                <ConfirmDialog
                    title={confirmDialogInfo.title}
                    text={confirmDialogInfo.text}
                    confirmText="Aceptar"
                    onAccept={onConfirm}
                    onCancel={() => toggleModal("confirmation", false)}
                />
            )}
            {modalState.cancel && selectedTask && (
                <CancelTaskForm
                    exitAction={() => toggleModal("cancel", false)}
                    taskInfo={selectedTask}
                />
            )}
        </>
    );
}
