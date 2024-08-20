"use client";

import apiRequest from "@/services/apiService";
import CameraWidget from "@/components/discrete/cameraWidget";
import ControllerStatus from "@/components/controllerStatus";
import Loader from "@/components/discrete/loader";
import Log from "@/types/Log";
import LogsViewer from "@/components/discrete/logsViewer";
import Terminal from "@/components/terminal";
import useAuth from "@/hooks/useauth";
import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect } from "react";

export default function MonitorView() {
    const [logs, setLogs] = useState<Log[]>([]);

    // User authentication
    const authorized = useAuth(true);

    // Context
    const { showErrorDialog } = useNotification();

    // Action to execute at the beginning
    useEffect(() => {
        if (!authorized) {
            return;
        }

        apiRequest("monitor/logs", "GET")
            .then((data) => {
                setLogs(data);
            })
            .catch((error) => {
                showErrorDialog("Error solicitando registros: " + error.message);
            });
    }, [authorized]);

    if (!authorized) {
        return <Loader />;
    }

    return (
        <section data-section-id="1" className="overflow-hidden py-4">
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white p-4">
                    <h2 className="mb-4 text-center text-3xl font-semibold">Monitor</h2>
                    <div className="grid gap-2 lg:grid-cols-2">
                        <ControllerStatus />
                        <Terminal />
                        <CameraWidget />
                        <LogsViewer logs={logs} />
                    </div>
                </div>
            </div>
        </section>
    );
}
