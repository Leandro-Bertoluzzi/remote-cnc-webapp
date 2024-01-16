import { ChangeEvent } from 'react';
import { Label, TextInput } from 'flowbite-react';
import LabeledTextInputProps from '../../types/LabeledTextInputProps';

export default function LabeledTextInput(props: LabeledTextInputProps) {
    // Props
    const { handleChange, name, label, placeholder, value, type } = props;

    // Methods
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            return;
        }

        handleChange(e.target.value);
    };

    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={`input-${name}`}
                    value={label}
                />
            </div>
            <TextInput
                id={`input-${name}`}
                type={type ?? "text"}
                value={value ?? ""}
                placeholder={placeholder}
                onChange={handleTextChange}
                required
            />
        </>
    );
}
