import { ChangeEvent } from "react";
import { Label, TextInput } from "flowbite-react";
import { InputType } from "@/types/InputType";

interface LabeledTextInputProps {
    handleChange: (value: string) => void;
    name: string;
    label: string;
    placeholder: string;
    value?: string;
    type?: InputType;
}

export default function LabeledTextInput(props: LabeledTextInputProps) {
    // Props
    const { handleChange, name, label, placeholder, value, type } = props;

    // Methods
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value);
    };

    return (
        <>
            <div className="mb-2 block">
                <Label htmlFor={`input-${name}`} value={label} />
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
