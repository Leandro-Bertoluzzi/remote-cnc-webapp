import { ChangeEvent } from "react";
import { Label, Textarea } from "flowbite-react";

export interface LabeledTextAreaProps {
    handleChange: (value: string) => void;
    name: string;
    label: string;
    placeholder: string;
    value?: string;
}

export default function LabeledTextArea(props: LabeledTextAreaProps) {
    // Props
    const { handleChange, name, label, placeholder, value } = props;

    // Methods
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleChange(e.target.value);
    };

    return (
        <>
            <div className="mb-2 block">
                <Label htmlFor={`text-${name}`} value={label} />
            </div>
            <Textarea
                id={`text-${name}`}
                value={value ?? ""}
                placeholder={placeholder}
                onChange={handleTextChange}
                rows={4}
                cols={50}
                required
            />
        </>
    );
}
