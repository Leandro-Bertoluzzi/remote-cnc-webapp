import Card from './card';
import { BUTTON_APPROVE, BUTTON_REJECT, BUTTON_CANCEL } from './cardButton';

export default function TaskCard(props: any) {
    const { task } = props;

    const materialText = `Material: ${task.material}`;
    const toolText = `Tool: ${task.tool}`;
    const fileText = `File: ${task.file}`;

    // TODO (buttons): approve+reject for admin, cancel for user

    return (
      <Card
        mainText={task.name}
        additionalText={[materialText, toolText, fileText, task.notes]}
        buttons={[BUTTON_APPROVE, BUTTON_REJECT, BUTTON_CANCEL]}
      />
    )
  }