import { BUTTON_DOWNLOAD, BUTTON_EDIT, BUTTON_REMOVE } from "../discrete/cardButton";
import ButtonInfo from "@/types/ButtonInfo";
import BaseCard from "./baseCard";
import FileInfo from "@/types/FileInfo";

export interface FileCardProps {
    file: FileInfo;
    onEdit: () => void;
    onRemove: () => void;
}

export default function FileCard(props: FileCardProps) {
    // Props
    const { file, onEdit, onRemove } = props;

    // Text
    const createdAt = new Date(file.created_at);
    const createdAtText = `Created at: ${createdAt.toLocaleString()}`;

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
    const btnRemove: ButtonInfo = {
        type: BUTTON_REMOVE,
        action: onRemove,
    };

    return (
        <>
            <BaseCard
                mainText={file.name}
                additionalText={[createdAtText]}
                buttons={[btnDownload, btnEdit, btnRemove]}
            />
        </>
    );
}
