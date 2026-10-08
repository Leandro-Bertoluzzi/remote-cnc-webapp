import {
    TaskClient,
    TaskActionResponse,
    TaskPauseResponse,
    TaskPayload,
    TaskStatusPayload,
} from "@/application/tasks/taskClient";
import { createApiClient } from "@/infrastructure/clients/apiClient";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";

const apiClient = createApiClient(createSessionStorageClient());

export function createTaskClient(): TaskClient {
    return {
        createTask: (payload: TaskPayload) =>
            apiClient.request("tasks", "POST", { body: payload, json: true }) as Promise<TaskActionResponse>,
        removeTask: (taskId: number) => apiClient.request(`tasks/${taskId}`, "DELETE") as Promise<TaskActionResponse>,
        runTask: (taskId: number) => apiClient.request(`worker/task/${taskId}`, "POST") as Promise<TaskActionResponse>,
        updateTask: (taskId: number, payload: TaskPayload) =>
            apiClient.request(`tasks/${taskId}`, "PUT", { body: payload, json: true }) as Promise<TaskActionResponse>,
        updateTaskStatus: (taskId: number, payload: TaskStatusPayload) =>
            apiClient.request(`tasks/${taskId}/status`, "PUT", { body: payload, json: true }) as Promise<TaskActionResponse>,
        cancelTask: (taskId: number, cancellationReason: string) =>
            apiClient.request(
                `tasks/${taskId}/status`,
                "PUT",
                {
                    body: { status: "cancelled", cancellation_reason: cancellationReason },
                    json: true,
                }
            ) as Promise<TaskActionResponse>,
        togglePause: async () => {
            const response = (await apiClient.request("worker/pause", "GET")) as TaskPauseResponse;
            return (await apiClient.request(`worker/pause/${response.paused ? 0 : 1}`, "PUT")) as TaskActionResponse;
        },
    };
}
