type btnActionType = (value: string) => void;

interface SelectOption {
    label: string;
    value: string | number;
}

export default interface LabeledSelectProps {
    handleChange: btnActionType;
    name: string;
    label: string;
    options: SelectOption[];
    initialValue?: string | number;
}
