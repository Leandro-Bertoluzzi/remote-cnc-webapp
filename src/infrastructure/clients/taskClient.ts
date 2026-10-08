import { TaskClient, TaskActionResponse, TaskPauseResponse } from "@/application/tasks/taskClient";
import apiRequest from "@/services/apiService";

export function createTaskClient(): TaskClient {
    return {
        removeTask: (taskId: number) => apiRequest(`tasks/${taskId}`, "DELETE") as Promise<TaskActionResponse>,
        runTask: (taskId: number) => apiRequest(`worker/task/${taskId}`, "POST") as Promise<TaskActionResponse>,
        updateTaskStatus: (taskId: number, status: string) =>
            apiRequest(`tasks/${taskId}/status`, "PUT", { status }, true) as Promise<TaskActionResponse>,
        togglePause: async () => {
            const response = (await apiRequest("worker/pause", "GET")) as TaskPauseResponse;
            return (await apiRequest(`worker/pause/${response.paused ? 0 : 1}`, "PUT")) as TaskActionResponse;
        },
    };
}