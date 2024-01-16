type btnActionType = (file: File) => void;

export default interface LabeledFileInputProps {
    handleChange: btnActionType;
    name: string;
    label: string;
    helperText: string;
    accept: string;
}
