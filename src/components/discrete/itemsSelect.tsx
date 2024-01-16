import { ChangeEvent } from 'react';
import { Label, Select } from 'flowbite-react';
import ItemsSelectProps from '../../types/ItemsSelectProps';

export default function ItemsSelect(props: ItemsSelectProps) {
    // Props
    const { handleChange, name, label, items, selectedOption } = props;

    // Methods
    const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) {
            return;
        }

        handleChange(parseInt(e.target.value));
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
                items.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </option>
                ))
            }
            </Select>
        </>
    );
}
