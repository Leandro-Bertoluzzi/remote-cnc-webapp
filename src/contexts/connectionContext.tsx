"use client";

import { createContext, ReactNode, useContext, useState, useCallback } from "react";

interface ConnectionContextProps {
    updateConnected: (connected: boolean) => void;
    connected: boolean;
}

const ConnectionContext = createContext<ConnectionContextProps | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
    const [connected, setConnected] = useState<boolean>(false);

    const updateConnected = useCallback((conn: boolean) => {
        setConnected(conn);
    }, []);

    return (
        <ConnectionContext.Provider
            value={{
                updateConnected,
                connected,
            }}
        >
            {children}
        </ConnectionContext.Provider>
    );
}

export function useConnection(): ConnectionContextProps {
    const context = useContext(ConnectionContext);
    if (!context) {
        throw new Error("useConnection must be used within a ConnectionProvider");
    }
    return context;
}
