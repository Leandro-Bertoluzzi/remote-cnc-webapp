export interface WorkerStatus {
    enabled: boolean;
    running: boolean;
    available: boolean;
}

export interface WorkerStatusClient {
    checkStatus: () => Promise<WorkerStatus>;
}