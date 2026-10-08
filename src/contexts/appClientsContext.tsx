"use client";

import { AuthClient } from "@/application/auth/authClient";
import { ControllerClient } from "@/application/controller/controllerClient";
import { ManagementClient } from "@/application/management/managementClient";
import { TaskClient } from "@/application/tasks/taskClient";
import { SessionStoragePort } from "@/domain/ports/sessionStorage";
import { createAuthClient } from "@/infrastructure/clients/authClient";
import { createControllerClient } from "@/infrastructure/clients/controllerClient";
import { createManagementClient } from "@/infrastructure/clients/managementClient";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";
import { createTaskClient } from "@/infrastructure/clients/taskClient";
import React, { createContext, ReactNode, useContext, useMemo } from "react";

interface AppClients {
    authClient: AuthClient;
    taskClient: TaskClient;
    controllerClient: ControllerClient;
    managementClient: ManagementClient;
    sessionStorageClient: SessionStoragePort;
}

const defaultClients: AppClients = {
    authClient: createAuthClient(),
    taskClient: createTaskClient(),
    controllerClient: createControllerClient(),
    managementClient: createManagementClient(),
    sessionStorageClient: createSessionStorageClient(),
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
