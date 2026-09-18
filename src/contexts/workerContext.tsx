"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { WorkerStatus, WorkerStatusClient } from "@/application/worker/workerStatusClient";
import { createWorkerStatusClient } from "@/infrastructure/clients/workerStatusClient";
import { useNotification } from "./notificationContext";

interface WorkerStatusContextProps {
    workerStatus: WorkerStatus;
}

const INITIAL_STATUS: WorkerStatus = {
    enabled: false,
    running: false,
    available: false,
};

const WorkerStatusContext = createContext<WorkerStatusContextProps | undefined>(undefined);

interface WorkerStatusProviderProps {
    children: ReactNode;
    client?: WorkerStatusClient;
}

const defaultClient = createWorkerStatusClient();

export function WorkerStatusProvider({ children, client = defaultClient }: WorkerStatusProviderProps) {
    const [workerStatus, setWorkerStatus] = useState(INITIAL_STATUS);

    // Context
    const { showErrorDialog } = useNotification();

    useEffect(() => {
        const request_status = () => {
            client
                .checkStatus()
                .then((response) => setWorkerStatus(response))
                .catch((error) => {
                    setWorkerStatus(INITIAL_STATUS);
                    showErrorDialog(error.message);
                });
        };

        const id = setInterval(request_status, 1000);

        return () => clearInterval(id);
    }, [client, showErrorDialog]);

    return (
        <WorkerStatusContext.Provider value={{ workerStatus }}>
            {children}
        </WorkerStatusContext.Provider>
    );
}

export function useWorkerStatus(): WorkerStatusContextProps {
    const context = useContext(WorkerStatusContext);
    if (!context) {
        throw new Error("useWorkerStatus must be used within a WorkerStatusProvider");
    }
    return context;
}
