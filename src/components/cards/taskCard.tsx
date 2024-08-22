import {
    BUTTON_CANCEL,
    BUTTON_EDIT,
    BUTTON_APPROVE,
    BUTTON_PAUSE,
    BUTTON_REMOVE,
    BUTTON_RESTORE,
    BUTTON_REPEAT,
    BUTTON_RETRY,
    BUTTON_RUN,
} from "../discrete/cardButton";
import ButtonInfo, { ButtonInfoArray } from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import TaskCardProps from "@/types/TaskCardProps";

// Constants

export const TASK_FINISHED_STATUS = "finished";
export const TASK_CANCELLED_STATUS = "cancelled";
export const TASK_ON_HOLD_STATUS = "on_hold";
export const TASK_APPROVED_STATUS = TASK_ON_HOLD_STATUS;
export const TASK_INITIAL_STATUS = "pending_approval";
export const TASK_FAILED_STATUS = "failed";
export const TASK_IN_PROGRESS_STATUS = "in_progress";

export default function TaskCard(props: TaskCardProps) {
    // Props
    const {
        task,
        show,
        toolsList,
        materialsList,
        filesList,
        onEdit,
        onCancel,
        onRemove,
        onApprove,
        onRestore,
        onRun,
        onPause,
        onRetry,
    } = props;

    // Text
    const materialText = `Material: ${materialsList.find((material) => material.id == task.material_id)?.name}`;
    const toolText = `Herramienta: ${toolsList.find((tool) => tool.id == task.tool_id)?.name}`;
    const fileText = `Archivo: ${filesList.find((file) => file.id == task.file_id)?.name}`;
    const additionalText = [materialText, toolText, fileText];

    // Card buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: onEdit,
    };
    const btnCancel: ButtonInfo = {
        type: BUTTON_CANCEL,
        action: onCancel,
    };
    const btnApprove: ButtonInfo = {
        type: BUTTON_APPROVE,
        action: onApprove,
    };
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: onRemove,
    };
    const btnRestore: ButtonInfo = {
        type: BUTTON_RESTORE,
        action: onRestore,
    };
    const btnRepeat: ButtonInfo = {
        type: BUTTON_REPEAT,
        action: onRetry,
    };
    const btnRetry: ButtonInfo = {
        type: BUTTON_RETRY,
        action: onRetry,
    };
    const btnRun: ButtonInfo = {
        type: BUTTON_RUN,
        action: onRun,
    };
    const btnPause: ButtonInfo = {
        //('Retomar' if self.paused else 'Pausar', self.pauseTask)
        type: BUTTON_PAUSE,
        action: onPause,
    };

    const button_info: ButtonInfoArray = {
        [TASK_INITIAL_STATUS]: [btnEdit, btnApprove, btnCancel],
        [TASK_ON_HOLD_STATUS]: [btnCancel, btnRun],
        [TASK_CANCELLED_STATUS]: [btnRemove, btnRestore],
        [TASK_IN_PROGRESS_STATUS]: [btnPause],
        [TASK_FINISHED_STATUS]: [btnRepeat, btnRemove],
        [TASK_FAILED_STATUS]: [btnRetry],
    };

    const cardButtons: ButtonInfo[] = [];
    for (const key in button_info) {
        if (task.status == key) {
            button_info[key].forEach((button) => {
                cardButtons.push(button);
            });
        }
    }

    // Customization by status

    if (task.note) {
        additionalText.push(task.note);
    }
    if (
        [TASK_ON_HOLD_STATUS, TASK_IN_PROGRESS_STATUS, TASK_FINISHED_STATUS].includes(task.status)
    ) {
        additionalText.push(`Aprobada por ${task.admin_id}`);
    }
    if (task.status === TASK_CANCELLED_STATUS && task.admin_id) {
        additionalText.push(`Rechazada por ${task.admin_id}`);
    }
    if (task.status === TASK_CANCELLED_STATUS) {
        additionalText.push(`Motivo de cancelación: ${task.cancellation_reason}`);
    }

    if (!show) {
        return <></>;
    }

    return <BaseCard mainText={task.name} additionalText={additionalText} buttons={cardButtons} />;
}
