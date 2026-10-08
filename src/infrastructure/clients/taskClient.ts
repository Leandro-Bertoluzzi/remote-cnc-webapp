import {
    TaskClient,
    TaskActionResponse,
    TaskPauseResponse,
    TaskPayload,
    TaskStatusPayload,
} from "@/application/tasks/taskClient";
import apiRequest from "@/services/apiService";

export function createTaskClient(): TaskClient {
    return {
        createTask: (payload: TaskPayload) =>
            apiRequest("tasks", "POST", payload, true) as Promise<TaskActionResponse>,
        removeTask: (taskId: number) => apiRequest(`tasks/${taskId}`, "DELETE") as Promise<TaskActionResponse>,
        runTask: (taskId: number) => apiRequest(`worker/task/${taskId}`, "POST") as Promise<TaskActionResponse>,
        updateTask: (taskId: number, payload: TaskPayload) =>
            apiRequest(`tasks/${taskId}`, "PUT", payload, true) as Promise<TaskActionResponse>,
        updateTaskStatus: (taskId: number, payload: TaskStatusPayload) =>
            apiRequest(`tasks/${taskId}/status`, "PUT", payload, true) as Promise<TaskActionResponse>,
        cancelTask: (taskId: number, cancellationReason: string) =>
            apiRequest(
                `tasks/${taskId}/status`,
                "PUT",
                { status: "cancelled", cancellation_reason: cancellationReason },
                true
            ) as Promise<TaskActionResponse>,
        togglePause: async () => {
            const response = (await apiRequest("worker/pause", "GET")) as TaskPauseResponse;
            return (await apiRequest(`worker/pause/${response.paused ? 0 : 1}`, "PUT")) as TaskActionResponse;
        },
    };
}
