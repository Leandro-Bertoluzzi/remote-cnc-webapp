import Card from './card';
import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE } from './cardButton';
import FileCardProps from '../types/FileCardProps';

export default function FileCard(props: FileCardProps) {
    const { file } = props;

    const createdAtText = `Created at: ${file.created_at}`;

    return (
        <Card
            mainText={file.file_name}
            additionalText={[createdAtText]}
            buttons={[BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE]}
        />
    )
}
