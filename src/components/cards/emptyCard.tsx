import EmptyCardProps from "../../types/EmptyCardProps";

export default function EmptyCard(props: EmptyCardProps) {
    const { itemName } = props;
    const text = `No hay ${itemName}`;

    return (
        <div className="w-full border-t p-3">
            <div className="flex flex-wrap items-center justify-center">
                <div className="flex flex-wrap items-center p-2">
                    <h3 className="font-heading mb-1 font-semibold">{text}</h3>
                </div>
            </div>
        </div>
    );
}
