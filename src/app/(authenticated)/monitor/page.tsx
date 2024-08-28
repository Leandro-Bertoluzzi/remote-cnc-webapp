"use client";

import apiRequest from "@/services/apiService";
import CameraWidget from "@/components/discrete/cameraWidget";
import ControllerStatus from "@/components/controllerStatus";
import Log from "@/types/Log";
import LogsViewer from "@/components/discrete/logsViewer";
import Terminal from "@/components/terminal";
import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect } from "react";
import withAuthentication from "@/components/wrappers/withAuthentication";

function MonitorView() {
    const [logs, setLogs] = useState<Log[]>([]);

    // Context
    const { showErrorDialog } = useNotification();

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest("monitor/logs", "GET")
            .then((data) => {
                setLogs(data);
            })
            .catch((error) => {
                showErrorDialog("Error solicitando registros: " + error.message);
            });
    }, [showErrorDialog]);

    return (
        <div className="rounded-xl border bg-white p-4">
            <h2 className="mb-4 text-center text-3xl font-semibold">Monitor</h2>
            <div className="grid gap-2 lg:grid-cols-2">
                <ControllerStatus />
                <Terminal />
                <CameraWidget />
                <LogsViewer logs={logs} />
            </div>
        </div>
    );
}

export default withAuthentication(MonitorView, true);
