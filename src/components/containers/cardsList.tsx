import CardListProps from "../../types/CardsListProps";
import { Button } from "flowbite-react";

export default function CardsList(props: CardListProps) {
    const { title, showAddItemBtn, addItemBtnText, addItemBtnAction } = props;

    return (
        <section
            data-section-id="1"
            data-share=""
            data-category="cards"
            className="overflow-hidden py-4"
        >
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white p-4">
                    <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                    <div className="flex flex-wrap">{props.children}</div>
                </div>
                {showAddItemBtn && (
                    <Button color="gray" onClick={addItemBtnAction}>
                        {addItemBtnText ?? "Crear nuevo"}
                    </Button>
                )}
            </div>
        </section>
    );
}

CardsList.defaultProps = {
    showAddItemBtn: false,
};
