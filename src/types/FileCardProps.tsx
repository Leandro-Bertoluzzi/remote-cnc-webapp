import FileInfo from './FileInfo';

type setStringActionType = (str: string) => void;

export default interface FileCardProps {
    file: FileInfo;
    setError: setStringActionType;
    setNotification: setStringActionType;
}
