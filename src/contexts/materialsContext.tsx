"use client";

import apiRequest from "@/services/apiService";
import Material from "@/types/Material";
import React, { createContext, ReactNode, useState, useCallback, useContext } from "react";
import { useNotification } from "./notificationContext";

interface MaterialsContextProps {
    fetchMaterials: () => void;
    materials: Material[];
}

export const MaterialsContext = createContext<MaterialsContextProps | undefined>(undefined);

export const MaterialsProvider = ({ children }: { children: ReactNode }) => {
    const [materials, setMaterials] = useState<Material[]>([]);

    // Context
    const { showErrorDialog } = useNotification();

    const fetchMaterials = useCallback(() => {
        apiRequest("materials", "GET")
            .then(setMaterials)
            .catch((error) => showErrorDialog(error.message));
    }, [showErrorDialog]);

    return (
        <MaterialsContext.Provider value={{ materials, fetchMaterials }}>
            {children}
        </MaterialsContext.Provider>
    );
};

export function useMaterials(): MaterialsContextProps {
    const context = useContext(MaterialsContext);
    if (!context) {
        throw new Error("useMaterials must be used within a MaterialsProvider");
    }
    return context;
}
