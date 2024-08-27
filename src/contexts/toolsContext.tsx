"use client";

import apiRequest from "@/services/apiService";
import Tool from "@/types/Tool";
import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useNotification } from "./notificationContext";

interface ToolsContextProps {
    fetchTools: () => void;
    tools: Tool[];
}

export const ToolsContext = createContext<ToolsContextProps | undefined>(undefined);

export const ToolsProvider = ({ children }: { children: ReactNode }) => {
    const [tools, setTools] = useState<Tool[]>([]);

    // Context
    const { showErrorDialog } = useNotification();

    const fetchTools = useCallback(() => {
        apiRequest("tools", "GET")
            .then(setTools)
            .catch((error) => showErrorDialog(error.message));
    }, [showErrorDialog]);

    return <ToolsContext.Provider value={{ tools, fetchTools }}>{children}</ToolsContext.Provider>;
};

export function useTools(): ToolsContextProps {
    const context = useContext(ToolsContext);
    if (!context) {
        throw new Error("useTools must be used within a ToolsProvider");
    }
    return context;
}
