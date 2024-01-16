type btnActionType = (id: number) => void;

interface Item {
    id: number;
    name: string;
}

export default interface ItemsSelectProps {
    handleChange: btnActionType;
    name: string;
    label: string;
    items: Item[];
    selectedOption?: number;
}
