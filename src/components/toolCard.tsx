import Card from './card';
import { BUTTON_EDIT, BUTTON_REMOVE } from './cardButton';
import ToolCardProps from '../types/ToolCardProps';

export default function ToolCard(props: ToolCardProps) {
    const { tool } = props;

    return (
      <Card
        mainText={tool.name}
        additionalText={[tool.description]}
        buttons={[BUTTON_EDIT, BUTTON_REMOVE]}
      />
    )
  }