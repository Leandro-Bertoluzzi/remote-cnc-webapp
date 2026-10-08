"use client";

import { ControllerClient } from "@/application/controller/controllerClient";
import { TaskClient } from "@/application/tasks/taskClient";
import { createControllerClient } from "@/infrastructure/clients/controllerClient";
import { createTaskClient } from "@/infrastructure/clients/taskClient";
import React, { createContext, ReactNode, useContext, useMemo } from "react";

interface AppClients {
    taskClient: TaskClient;
    controllerClient: ControllerClient;
}

const defaultClients: AppClients = {
    taskClient: createTaskClient(),
    controllerClient: createControllerClient(),
};

const AppClientsContext = createContext<AppClients>(defaultClients);

interface AppClientsProviderProps {
    children: ReactNode;
    clients?: Partial<AppClients>;
}

export function AppClientsProvider({ children, clients }: AppClientsProviderProps) {
    const value = useMemo(
        () => ({
            ...defaultClients,
            ...clients,
        }),
        [clients]
    );

    return <AppClientsContext.Provider value={value}>{children}</AppClientsContext.Provider>;
}

export function useAppClients(): AppClients {
    return useContext(AppClientsContext);
}