import {
    ControllerClient,
    ControllerActionResponse,
    JogPayload,
    PauseStateResponse,
} from "@/application/controller/controllerClient";
import GrblMessage from "@/types/GrblMessage";
import GrblStatus from "@/types/GrblStatus";
import { createApiClient } from "@/infrastructure/clients/apiClient";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";

const apiClient = createApiClient(createSessionStorageClient());

export function createControllerClient(): ControllerClient {
    return {
        subscribeStatus: (channel: string, onStatus: (status: GrblStatus) => void) => {
            const es = apiClient.stream(channel);

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
            const es = apiClient.stream(channel);

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
            apiClient.request("cnc/command", "POST", { body: { command }, json: true }) as Promise<ControllerActionResponse>,

        jog: (payload: JogPayload) =>
            apiClient.request("cnc/jog", "POST", { body: payload, json: true }) as Promise<ControllerActionResponse>,

        connectServer: async () => {
            await apiClient.request("cnc/server", "POST");
        },

        disconnectServer: async () => {
            await apiClient.request("cnc/server", "DELETE");
        },

        togglePause: async () => {
            const response = (await apiClient.request("worker/pause", "GET")) as { paused: boolean };
            await apiClient.request(`worker/pause/${response.paused ? 0 : 1}`, "PUT");
            return { paused: !response.paused } as PauseStateResponse;
        },

        getToolName: async (toolIndex: number) => {
            return (await apiClient.request(`tools/${toolIndex}`, "GET")) as { name: string };
        },
    };
}
