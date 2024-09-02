import apiRequest from "@/services/apiService";
import ButtonGrid from "@/components/containers/buttonGrid";
import { useConnection } from "@/contexts/connectionContext";
import { useNotification } from "@/contexts/notificationContext";
import { useState } from "react";

export default function ActionsPanel() {
    const [pausedText, setPausedText] = useState<string>("Pausar");

    // Context
    const { showErrorDialog, showNotification } = useNotification();
    const { connected } = useConnection();

    /*  Function: sendCommand
     *   Description: Requests the API to execute a command
     */
    const sendCommand = (command: string) => {
        apiRequest("cnc/command", "POST", { command }, true)
            .then((response) => showNotification(response.success))
            .catch((error) => showErrorDialog(error.message));
    };

    /*  Function: togglePausedTask
     *   Description: Requests the API to pause or resume the execution
     */
    async function togglePausedTask() {
        apiRequest("worker/pause", "GET")
            .then((response) => apiRequest(`worker/pause/${response.paused ? 0 : 1}`, "PUT"))
            .then((response) => setPausedText(response.paused ? "Retomar" : "Pausar"))
            .catch((error) => showErrorDialog(error.message));
    }

    return (
        <ButtonGrid
            buttons={[
                { type: "Home", action: () => sendCommand("$H") },
                { type: pausedText, action: () => togglePausedTask() },
                {
                    type: "Configurar GRBL",
                    action: () => {
                        console.log("Configurado!");
                    },
                },
                { type: "Modo chequeo", action: () => sendCommand("$C") },
                { type: "Desactivar alarma", action: () => sendCommand("$X") },
                {
                    type: "Mover a",
                    action: () => {
                        console.log("Movido!");
                    },
                },
            ]}
            disabled={!connected}
        />
    );
}
