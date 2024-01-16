import { ChangeEvent } from 'react';
import { Label, FileInput } from 'flowbite-react';
import LabeledFileInputProps from '../../types/LabeledFileInputProps';

export default function LabeledFileInput(props: LabeledFileInputProps) {
    // Props
    const { handleChange, name, label, helperText, accept } = props;

    // Methods
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        handleChange(e.target.files[0]);
    };

    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={`input-${name}`}
                    value={label}
                />
            </div>
            <FileInput
                id={`input-${name}`}
                helperText={helperText}
                onChange={handleFileChange}
                accept={accept}
                required
            />
        </>
    );
}
