import Card from './card';
import { BUTTON_EDIT, BUTTON_REMOVE } from './cardButton';

export default function ToolCard(props: any) {
    const { tool } = props;

    return (
      <Card
        mainText={tool.name}
        additionalText={[tool.description]}
        buttons={[BUTTON_EDIT, BUTTON_REMOVE]}
      />
    )
  }