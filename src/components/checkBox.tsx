import { ChangeEvent, useState } from 'react';
import CheckBoxProps from '../types/CheckBoxProps';

export default function CheckBox(props: CheckBoxProps) {
    // Props
    const { handleOnChange, initialChecked, text, id } = props;

    // Hooks for state variables
    const [isChecked, setIsChecked] = useState<boolean>(initialChecked);

    // Methods
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
        handleOnChange(id, e.target.checked);
    };

    return (
        <div>
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                checked={isChecked}
                onChange={handleCheck}
            />
            <label className="font-medium ml-4" htmlFor={`checkbox-${id}`}>{text}</label>
        </div>
    );
}
