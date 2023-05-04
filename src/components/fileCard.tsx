import Card from './card';
import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE } from './cardButton';

export default function FileCard(props: any) {
    const { file } = props;

    return (
      <Card
        mainText={file.name}
        additionalText={[file.description]}
        buttons={[BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE]}
      />
    )
  }