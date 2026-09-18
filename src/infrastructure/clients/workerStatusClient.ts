import { WorkerStatus, WorkerStatusClient } from "@/application/worker/workerStatusClient";
import apiRequest from "@/services/apiService";

export function createWorkerStatusClient(): WorkerStatusClient {
    return {
        checkStatus: async () => (await apiRequest("worker/check/available", "GET")) as WorkerStatus,
    };
}