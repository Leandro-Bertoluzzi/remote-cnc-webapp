export default interface CheckBoxProps {
    handleOnChange: (id: string, isChecked: boolean) => void;
    isChecked: boolean;
    text: string;
    id: string;
}
