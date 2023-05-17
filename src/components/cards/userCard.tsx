import { BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import Card from './card';
import UserCardProps from '../../types/UserCardProps';

export default function UserCard(props: UserCardProps) {
    const { user } = props;

    // Text
    const roleText = `Role: ${user.role}`;

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: () => {}
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: () => {}
    }

    return (
        <Card
            mainText={user.name}
            additionalText={[roleText, user.email]}
            buttons={[btnEdit, btnRemove]}
        />
    )
}
