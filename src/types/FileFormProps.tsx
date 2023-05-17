import FileInfo from "./FileInfo";

type btnActionType = () => void;

export default interface FileFormProps {
    exitAction: btnActionType;
    create: boolean;
    fileInfo: FileInfo;
}
