export interface ActionResponse {
    success: string;
}

export interface ManagementClient {
    uploadFile: (payload: FormData) => Promise<ActionResponse>;
    updateFile: (fileId: number, fileName: string) => Promise<ActionResponse>;
    removeFile: (fileId: number) => Promise<ActionResponse>;
    createMaterial: (payload: { name: string; description: string }) => Promise<ActionResponse>;
    updateMaterial: (
        materialId: number,
        payload: { name: string; description: string }
    ) => Promise<ActionResponse>;
    removeMaterial: (materialId: number) => Promise<ActionResponse>;
    createTool: (payload: { name: string; description: string }) => Promise<ActionResponse>;
    updateTool: (toolId: number, payload: { name: string; description: string }) => Promise<ActionResponse>;
    removeTool: (toolId: number) => Promise<ActionResponse>;
    createUser: (payload: { name: string; email: string; password: string; role: string }) => Promise<ActionResponse>;
    updateUser: (userId: number, payload: { name: string; email: string; role: string }) => Promise<ActionResponse>;
    removeUser: (userId: number) => Promise<ActionResponse>;
}