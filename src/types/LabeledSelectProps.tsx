type btnActionType = (value: string) => void;

export default interface LabeledSelectProps {
    handleChange: btnActionType;
    name: string;
    label: string;
    options: string[];
    selectedOption?: string;
}
