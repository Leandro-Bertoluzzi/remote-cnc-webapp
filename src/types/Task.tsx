type TaskStatus =
    | "pending_approval"
    | "on_hold"
    | "in_progress"
    | "finished"
    | "rejected"
    | "cancelled";

export default interface Task {
    id: number;
    name: string;
    status: TaskStatus;
    priority: number;
    user_id: number;
    material_id: number;
    tool_id: number;
    file_id: number;
    note: string;
    created_at: string;
    admin_id?: number;
    status_updated_at: string;
    cancellation_reason: string;
}
