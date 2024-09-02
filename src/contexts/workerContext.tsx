"use client";

import apiRequest from "@/services/apiService";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface WorkerStatusContextProps {
    workerStatus: {
        enabled: boolean,
        running: boolean,
        available: boolean
    };
}

const WorkerStatusContext = createContext<WorkerStatusContextProps | undefined>(undefined);

export function WorkerStatusProvider({ children }: { children: ReactNode }) {
    const [workerStatus, setWorkerStatus] = useState({
        enabled: false,
        running: false,
        available: false,
    });

    const request_status = () => {
        apiRequest("worker/check/available", "GET")
            .then((response) => setWorkerStatus(response))
            .catch((error) => console.log("ERROR", error.message));
    };

    useEffect(() => {
        const id = setInterval(request_status, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <WorkerStatusContext.Provider
            value={{ workerStatus }}
        >
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
