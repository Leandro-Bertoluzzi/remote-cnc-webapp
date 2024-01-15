import FileInfo from "./FileInfo";

type btnActionType = () => void;
type setStringActionType = (str: string) => void;

export default interface FileFormProps {
    exitAction: btnActionType;
    create: boolean;
    fileInfo: FileInfo;
    setError: setStringActionType;
}
