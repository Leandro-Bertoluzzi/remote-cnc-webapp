import { ItemsClient } from "@/application/items/itemsClient";
import FileInfo from "@/types/FileInfo";
import Material from "@/types/Material";
import Task from "@/types/Task";
import Tool from "@/types/Tool";
import User from "@/types/User";
import { createApiClient } from "@/infrastructure/clients/apiClient";
import { createSessionStorageClient } from "@/infrastructure/clients/sessionStorageClient";

const apiClient = createApiClient(createSessionStorageClient());

export function createItemsClient(): ItemsClient {
    return {
        getFiles: () => apiClient.request("files", "GET") as Promise<FileInfo[]>,
        getMaterials: () => apiClient.request("materials", "GET") as Promise<Material[]>,
        getTasks: () => apiClient.request("tasks", "GET") as Promise<Task[]>,
        getTools: () => apiClient.request("tools", "GET") as Promise<Tool[]>,
        getUsers: () => apiClient.request("users", "GET") as Promise<User[]>,
    };
}
