import Card from './card';
import { BUTTON_EDIT, BUTTON_REMOVE } from './cardButton';

export default function UserCard(props: any) {
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