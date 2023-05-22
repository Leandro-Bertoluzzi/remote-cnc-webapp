type TaskStatus = 'pending_approval' | 'on_hold' | 'in_progress' | 'finished' | 'rejected';

export default interface Task {
    id: number;
    name: string;
    material: string;
    material_id: number;
    tool: string;
    tool_id: number;
    file: string;
    file_id: number;
    note: string;
    priority: number;
    created_at: string;
    approved_at?: string;
    rejected_at?: string;
    finished_at?: string;
    status: TaskStatus;
}
