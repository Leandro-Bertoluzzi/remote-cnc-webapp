type TaskStatus = 'pending_approval' | 'on_hold' | 'in_progress' | 'finished' | 'rejected';

export default interface Task {
    id: number;
    name: string;
    status: TaskStatus;
    priority: number;
    material: string;
    material_id: number;
    tool: string;
    tool_id: number;
    file: string;
    file_id: number;
    note: string;
    created_at: string;
    admin: string;
    status_updated_at: string;
}
