type btnActionType = (id: string, isChecked: boolean) => void;

export default interface CheckBoxProps {
    handleOnChange: btnActionType;
    initialChecked: boolean;
    text: string;
    id: string;
}
