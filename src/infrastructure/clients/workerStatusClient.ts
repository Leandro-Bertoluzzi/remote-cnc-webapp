import { WorkerStatus, WorkerStatusClient } from "@/application/worker/workerStatusClient";
import { createApiClient } from "@/infrastructure/clients/apiClient";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";

const apiClient = createApiClient(createSessionStorageClient());

export function createWorkerStatusClient(): WorkerStatusClient {
    return {
        checkStatus: async () => (await apiClient.request("worker/check/available", "GET")) as WorkerStatus,
    };
}
