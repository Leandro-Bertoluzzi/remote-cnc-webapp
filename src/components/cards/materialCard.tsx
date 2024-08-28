import { BUTTON_EDIT, BUTTON_REMOVE } from "../discrete/cardButton";
import ButtonInfo from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import Material from "@/types/Material";

export interface MaterialCardProps {
    material: Material;
    onEdit: () => void;
    onRemove: () => void;
}

export default function MaterialCard(props: MaterialCardProps) {
    // Props
    const { material, onEdit, onRemove } = props;

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
            mainText={material.name}
            additionalText={[material.description]}
            buttons={[btnEdit, btnRemove]}
        />
    );
}
