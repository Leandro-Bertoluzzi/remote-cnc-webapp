export interface TaskActionResponse {
    success: string;
}

export interface TaskPauseResponse {
    paused: boolean;
    success: string;
}

export interface TaskPayload {
    name: string;
    note: string;
    tool_id: number;
    material_id: number;
    file_id: number;
}

export interface TaskStatusPayload {
    status: string;
}

export interface TaskClient {
    createTask: (payload: TaskPayload) => Promise<TaskActionResponse>;
    removeTask: (taskId: number) => Promise<TaskActionResponse>;
    runTask: (taskId: number) => Promise<TaskActionResponse>;
    updateTask: (taskId: number, payload: TaskPayload) => Promise<TaskActionResponse>;
    updateTaskStatus: (taskId: number, payload: TaskStatusPayload) => Promise<TaskActionResponse>;
    cancelTask: (taskId: number, cancellationReason: string) => Promise<TaskActionResponse>;
    togglePause: () => Promise<TaskActionResponse>;
}
