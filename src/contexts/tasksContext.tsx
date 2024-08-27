"use client";

import apiRequest from "@/services/apiService";
import Task from "@/types/Task";
import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useNotification } from "./notificationContext";

interface TasksContextProps {
    fetchTasks: () => void;
    tasks: Task[];
}

export const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Context
    const { showErrorDialog } = useNotification();

    const fetchTasks = useCallback(() => {
        apiRequest("tasks", "GET")
            .then(setTasks)
            .catch((error) => showErrorDialog(error.message));
    }, [showErrorDialog]);

    return <TasksContext.Provider value={{ tasks, fetchTasks }}>{children}</TasksContext.Provider>;
};

export function useTasks(): TasksContextProps {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider");
    }
    return context;
}
