import Card from './card';
import { BUTTON_EDIT, BUTTON_REMOVE } from './cardButton';
import UserCardProps from '../types/UserCardProps';

export default function UserCard(props: UserCardProps) {
    const { user } = props;

    const roleText = `Role: ${user.role}`;

    return (
      <Card
        mainText={user.name}
        additionalText={[roleText, user.email]}
        buttons={[BUTTON_EDIT, BUTTON_REMOVE]}
      />
    )
  }