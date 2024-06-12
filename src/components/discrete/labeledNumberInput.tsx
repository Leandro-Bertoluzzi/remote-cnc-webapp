import { ChangeEvent } from "react";
import { Label, TextInput } from "flowbite-react";
import LabeledNumberInputProps from "@/types/LabeledNumberInputProps";

export default function LabeledNumberInput(props: LabeledNumberInputProps) {
    // Props
    const { handleChange, name, label, value, min, max, step } = props;

    // Methods
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            return;
        }

        handleChange(parseFloat(e.target.value));
    };

    return (
        <>
            <div className="mb-2 block">
                <Label htmlFor={`input-${name}`} value={label} />
            </div>
            <TextInput
                id={`input-${name}`}
                type="number"
                value={value ?? ""}
                onChange={handleTextChange}
                min={min ?? 0}
                max={max}
                step={step ?? 1}
                required
            />
        </>
    );
}
