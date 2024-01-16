import { ChangeEvent } from 'react';
import { Label, Select } from 'flowbite-react';
import LabeledSelectProps from '../../types/LabeledSelectProps';

export default function LabeledSelect(props: LabeledSelectProps) {
    // Props
    const { handleChange, name, label, options, selectedOption } = props;

    // Methods
    const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) {
            return;
        }

        handleChange(e.target.value);
    };

    return (
        <>
            <div className="mb-2 block">
                <Label
                    htmlFor={`select-${name}`}
                    value={label}
                />
            </div>
            <Select
                id={`select-${name}`}
                value={selectedOption}
                onChange={handleOptionChange}
                required
            >
            {
                options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))
            }
            </Select>
        </>
    );
}
