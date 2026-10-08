import { ControllerClient } from "@/application/controller/controllerClient";
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

        getToolName: async (toolIndex: number) => {
            return (await apiRequest(`tools/${toolIndex}`, "GET")) as { name: string };
        },
    };
}