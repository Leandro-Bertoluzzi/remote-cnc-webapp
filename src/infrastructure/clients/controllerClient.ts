import {
    ControllerClient,
    ControllerActionResponse,
    JogPayload,
    PauseStateResponse,
} from "@/application/controller/controllerClient";
import GrblMessage from "@/types/GrblMessage";
import GrblStatus from "@/types/GrblStatus";
import apiRequest, { getEventSource } from "@/services/apiService";

export function createControllerClient(): ControllerClient {
    return {
        subscribeStatus: (channel: string, onStatus: (status: GrblStatus) => void) => {
            const es = getEventSource(channel);

            es.onopen = () => console.log(">>> Connection opened!");
            es.onerror = (e) => console.log("ERROR!", e);
            es.addEventListener(channel, (event) => {
                if (event.data) {
                    onStatus(JSON.parse(event.data));
                }
            });

            return () => es.close();
        },

        subscribeMessages: (channel: string, onMessage: (message: GrblMessage) => void) => {
            const es = getEventSource(channel);

            es.onopen = () => console.log(">>> Connection opened!");
            es.onerror = (e) => console.log("ERROR!", e);
            es.addEventListener(channel, (event) => {
                if (event.data) {
                    onMessage(JSON.parse(event.data));
                }
            });

            return () => es.close();
        },

        sendCommand: (command: string) =>
            apiRequest("cnc/command", "POST", { command }, true) as Promise<ControllerActionResponse>,

        jog: (payload: JogPayload) =>
            apiRequest("cnc/jog", "POST", payload, true) as Promise<ControllerActionResponse>,

        connectServer: async () => {
            await apiRequest("cnc/server", "POST");
        },

        disconnectServer: async () => {
            await apiRequest("cnc/server", "DELETE");
        },

        togglePause: async () => {
            const response = (await apiRequest("worker/pause", "GET")) as { paused: boolean };
            await apiRequest(`worker/pause/${response.paused ? 0 : 1}`, "PUT");
            return { paused: !response.paused } as PauseStateResponse;
        },

        getToolName: async (toolIndex: number) => {
            return (await apiRequest(`tools/${toolIndex}`, "GET")) as { name: string };
        },
    };
}