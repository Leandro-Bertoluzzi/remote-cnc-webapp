type btnActionType = (text: string) => void;

export default interface LabeledTextAreaProps {
    handleChange: btnActionType;
    name: string;
    label: string;
    placeholder: string;
    value?: string;
}
