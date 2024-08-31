import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE, BUTTON_CREATE_TASK } from "../discrete/cardButton";
import ButtonInfo from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import config from "@/config";
import FileInfo from "@/types/FileInfo";

export interface FileCardProps {
    file: FileInfo;
    onEdit: () => void;
    onRemove: () => void;
    onNewTask: () => void;
}

const { THUMBNAILS_URL } = config;

export default function FileCard(props: FileCardProps) {
    // Props
    const { file, onEdit, onRemove, onNewTask } = props;

    // Text
    const createdAt = new Date(file.created_at);
    const createdAtText = `Created at: ${createdAt.toLocaleString()}`;

    // Image
    const imageSource = THUMBNAILS_URL + "/" + file.id + ".png";

    // Buttons
    const btnDownload: ButtonInfo = {
        type: BUTTON_DOWNLOAD,
        action: () => {
            console.log("Download file: ", file.id);
        },
    };
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: onEdit,
    };
    const btnCreateTask: ButtonInfo = {
        type: BUTTON_CREATE_TASK,
        action: onNewTask,
    };
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: onRemove,
    };

    return (
        <BaseCard
            mainText={file.name}
            additionalText={[createdAtText]}
            buttons={[btnDownload, btnEdit, btnCreateTask, btnRemove,]}
            imgSrc={imageSource}
        />
    );
}
