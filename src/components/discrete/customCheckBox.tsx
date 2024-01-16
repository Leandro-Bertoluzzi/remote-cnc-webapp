import { ChangeEvent } from 'react';
import CheckBoxProps from '../../types/CheckBoxProps';
import { Checkbox, Label } from 'flowbite-react';

export default function CustomCheckBox(props: CheckBoxProps) {
    // Props
    const { handleOnChange, isChecked, text, id } = props;

    // Methods
    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        handleOnChange(id, e.target.checked);
    };

    return (
        <div className='flex items-center gap-2'>
            <Checkbox
                id={`checkbox-${id}`}
                defaultChecked={isChecked}
                onChange={handleCheck}
            />
            <Label
                className="flex"
                htmlFor={`checkbox-${id}`}
            >
                {text}
            </Label>
        </div>
    );
}
