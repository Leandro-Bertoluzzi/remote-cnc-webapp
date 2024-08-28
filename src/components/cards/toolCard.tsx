import { BUTTON_EDIT, BUTTON_REMOVE } from "../discrete/cardButton";
import ButtonInfo from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import Tool from "@/types/Tool";

export interface ToolCardProps {
    tool: Tool;
    onEdit: () => void;
    onRemove: () => void;
}

export default function ToolCard(props: ToolCardProps) {
    // Props
    const { tool, onEdit, onRemove } = props;

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: onEdit,
    };
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: onRemove,
    };

    return (
        <BaseCard
            mainText={tool.name}
            additionalText={[tool.description]}
            buttons={[btnEdit, btnRemove]}
        />
    );
}
