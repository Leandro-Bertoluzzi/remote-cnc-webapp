type btnActionType = (text: string) => void;
type InputType = 'text' | 'password' | 'email' | 'tel' | 'time' | 'url';

export default interface LabeledTextInputProps {
    handleChange: btnActionType;
    name: string;
    label: string;
    placeholder: string;
    value?: string;
    type?: InputType;
}
