import { ActionResponse, ManagementClient } from "@/application/management/managementClient";
import apiRequest from "@/services/apiService";

export function createManagementClient(): ManagementClient {
    return {
        uploadFile: (payload: FormData) => apiRequest("files", "POST", payload) as Promise<ActionResponse>,
        updateFile: (fileId: number, fileName: string) =>
            apiRequest(`files/${fileId}`, "PUT", { file_name: fileName }, true) as Promise<ActionResponse>,
        removeFile: (fileId: number) => apiRequest(`files/${fileId}`, "DELETE") as Promise<ActionResponse>,
        createMaterial: (payload) =>
            apiRequest("materials", "POST", payload, true) as Promise<ActionResponse>,
        updateMaterial: (materialId, payload) =>
            apiRequest(`materials/${materialId}`, "PUT", payload, true) as Promise<ActionResponse>,
        removeMaterial: (materialId) =>
            apiRequest(`materials/${materialId}`, "DELETE") as Promise<ActionResponse>,
        createTool: (payload) => apiRequest("tools", "POST", payload, true) as Promise<ActionResponse>,
        updateTool: (toolId, payload) =>
            apiRequest(`tools/${toolId}`, "PUT", payload, true) as Promise<ActionResponse>,
        removeTool: (toolId) => apiRequest(`tools/${toolId}`, "DELETE") as Promise<ActionResponse>,
        createUser: (payload) => apiRequest("users", "POST", payload, true) as Promise<ActionResponse>,
        updateUser: (userId, payload) =>
            apiRequest(`users/${userId}`, "PUT", payload, true) as Promise<ActionResponse>,
        removeUser: (userId) => apiRequest(`users/${userId}`, "DELETE") as Promise<ActionResponse>,
    };
}