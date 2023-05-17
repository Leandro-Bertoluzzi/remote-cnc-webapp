import FileInfo from './FileInfo';

type btnActionType = (file: FileInfo) => void;

export default interface FileCardProps {
    file: FileInfo;
    updateAction: btnActionType;
}
