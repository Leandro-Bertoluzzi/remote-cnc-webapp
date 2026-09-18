import apiRequest from "@/services/apiService";
import { ItemsClient } from "@/application/items/itemsClient";
import FileInfo from "@/types/FileInfo";
import Material from "@/types/Material";
import Task from "@/types/Task";
import Tool from "@/types/Tool";
import User from "@/types/User";

export function createItemsClient(): ItemsClient {
    return {
        getFiles: () => apiRequest("files", "GET") as Promise<FileInfo[]>,
        getMaterials: () => apiRequest("materials", "GET") as Promise<Material[]>,
        getTasks: () => apiRequest("tasks", "GET") as Promise<Task[]>,
        getTools: () => apiRequest("tools", "GET") as Promise<Tool[]>,
        getUsers: () => apiRequest("users", "GET") as Promise<User[]>,
    };
}