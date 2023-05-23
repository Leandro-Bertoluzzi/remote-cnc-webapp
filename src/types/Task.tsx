type TaskStatus = 'pending_approval' | 'on_hold' | 'in_progress' | 'finished' | 'rejected' | 'cancelled';

export default interface Task {
    id: number;
    name: string;
    status: TaskStatus;
    priority: number;
    user: string;
    user_id: number;
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
    cancellation_reason: string;
}
