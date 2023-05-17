import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE } from '../cardButton';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import Card from './card';
import FileCardProps from '../../types/FileCardProps';

export default function FileCard(props: FileCardProps) {
    const { file } = props;

    // Text
    const createdAtText = `Created at: ${file.created_at}`;

    // Methods
    const removeFile = () => {
        const url = `files/${file.id}`;

        apiRequest(url, 'DELETE')
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    };

    // Buttons
    const btnDownload: ButtonInfo = {
        type: BUTTON_DOWNLOAD,
        action: () => {console.log("Download file: ", file.id);}
    }
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: () => {console.log("Edit file: ", file.id);}
    }
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: removeFile
    }

    return (
        <Card
            mainText={file.file_name}
            additionalText={[createdAtText]}
            buttons={[btnDownload, btnEdit, btnRemove]}
        />
    )
}
