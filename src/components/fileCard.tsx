import Card from './card';
import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE } from './cardButton';
import FileCardProps from '../types/FileCardProps';

export default function FileCard(props: FileCardProps) {
    const { file } = props;

    return (
        <Card
            mainText={file.name}
            additionalText={[file.description]}
            buttons={[BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE]}
        />
    )
}
