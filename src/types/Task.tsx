type TaskStatus = 'pending_approval' | 'on_hold' | 'in_progress' | 'finished' | 'rejected';

export default interface Task {
    id: number;
    name: string;
    material: string;
    tool: string;
    file: string;
    note: string;
    priority: number;
    created_at: string;
    approved_at?: string;
    rejected_at?: string;
    finished_at?: string;
    status: TaskStatus;
}
