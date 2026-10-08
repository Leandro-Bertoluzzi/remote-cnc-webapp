export interface TaskActionResponse {
    success: string;
}

export interface TaskPauseResponse {
    paused: boolean;
    success: string;
}

export interface TaskClient {
    removeTask: (taskId: number) => Promise<TaskActionResponse>;
    runTask: (taskId: number) => Promise<TaskActionResponse>;
    updateTaskStatus: (taskId: number, status: string) => Promise<TaskActionResponse>;
    togglePause: () => Promise<TaskActionResponse>;
}