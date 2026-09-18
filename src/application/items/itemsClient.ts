import FileInfo from "@/types/FileInfo";
import Material from "@/types/Material";
import Task from "@/types/Task";
import Tool from "@/types/Tool";
import User from "@/types/User";

export interface ItemsClient {
    getFiles: () => Promise<FileInfo[]>;
    getMaterials: () => Promise<Material[]>;
    getTasks: () => Promise<Task[]>;
    getTools: () => Promise<Tool[]>;
    getUsers: () => Promise<User[]>;
}