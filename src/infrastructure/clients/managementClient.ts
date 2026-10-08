import { ActionResponse, ManagementClient } from "@/application/management/managementClient";
import { createApiClient } from "@/infrastructure/clients/apiClient";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";

const apiClient = createApiClient(createSessionStorageClient());

export function createManagementClient(): ManagementClient {
    return {
        uploadFile: (payload: FormData) => apiClient.request("files", "POST", { body: payload }) as Promise<ActionResponse>,
        updateFile: (fileId: number, fileName: string) =>
            apiClient.request(`files/${fileId}`, "PUT", {
                body: { file_name: fileName },
                json: true,
            }) as Promise<ActionResponse>,
        removeFile: (fileId: number) => apiClient.request(`files/${fileId}`, "DELETE") as Promise<ActionResponse>,
        createMaterial: (payload) =>
            apiClient.request("materials", "POST", { body: payload, json: true }) as Promise<ActionResponse>,
        updateMaterial: (materialId, payload) =>
            apiClient.request(`materials/${materialId}`, "PUT", { body: payload, json: true }) as Promise<ActionResponse>,
        removeMaterial: (materialId) =>
            apiClient.request(`materials/${materialId}`, "DELETE") as Promise<ActionResponse>,
        createTool: (payload) => apiClient.request("tools", "POST", { body: payload, json: true }) as Promise<ActionResponse>,
        updateTool: (toolId, payload) =>
            apiClient.request(`tools/${toolId}`, "PUT", { body: payload, json: true }) as Promise<ActionResponse>,
        removeTool: (toolId) => apiClient.request(`tools/${toolId}`, "DELETE") as Promise<ActionResponse>,
        createUser: (payload) => apiClient.request("users", "POST", { body: payload, json: true }) as Promise<ActionResponse>,
        updateUser: (userId, payload) =>
            apiClient.request(`users/${userId}`, "PUT", { body: payload, json: true }) as Promise<ActionResponse>,
        removeUser: (userId) => apiClient.request(`users/${userId}`, "DELETE") as Promise<ActionResponse>,
    };
}
