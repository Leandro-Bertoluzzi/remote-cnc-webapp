import { BUTTON_EDIT, BUTTON_REMOVE } from "../discrete/cardButton";
import ButtonInfo from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import User from "@/types/User";

export interface UserCardProps {
    user: User;
    onEdit: () => void;
    onRemove: () => void;
}

export default function UserCard(props: UserCardProps) {
    const { user, onEdit, onRemove } = props;

    // Text
    const roleText = `Role: ${user.role}`;

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
            mainText={user.name}
            additionalText={[roleText, user.email]}
            buttons={[btnEdit, btnRemove]}
        />
    );
}
