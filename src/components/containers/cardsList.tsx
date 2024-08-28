import { Button } from "flowbite-react";
import { ReactNode } from "react";

interface CardListProps {
    title: string;
    children: ReactNode;
    showAddItemBtn: boolean;
    addItemBtnAction?: () => void;
    addItemBtnText?: string;
}

export default function CardsList(props: CardListProps) {
    const { title, showAddItemBtn = false, addItemBtnText, addItemBtnAction } = props;

    return (
        <>
            <div className="rounded-xl border bg-white p-4">
                <h2 className="mb-4 text-center text-3xl font-semibold">{title}</h2>
                <div className="flex flex-wrap">{props.children}</div>
            </div>
            {showAddItemBtn && (
                <Button color="gray" onClick={addItemBtnAction}>
                    {addItemBtnText ?? "Crear nuevo"}
                </Button>
            )}
        </>
    );
}
