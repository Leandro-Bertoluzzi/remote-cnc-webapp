type btnActionType = (text: number) => void;

export default interface LabeledNumberInputProps {
    handleChange: btnActionType;
    name: string;
    label: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
}
