type btnActionType = (id: string, isChecked: boolean) => void;

export default interface CheckBoxProps {
    handleOnChange: btnActionType;
    isChecked: boolean;
    text: string;
    id: string;
}
