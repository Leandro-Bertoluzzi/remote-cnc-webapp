import CardListProps from '../../types/CardsListProps';
import { Button } from 'flowbite-react';

export default function CardsList(props: CardListProps) {
    const { title, showAddItemBtn, addItemBtnText, addItemBtnAction } = props;

    return (
        <section data-section-id="1" data-share="" data-category="cards" className="py-4 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="p-4 bg-white border rounded-xl">
                    <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                    <div className="flex flex-wrap">
                        {props.children}
                    </div>
                </div>
                {showAddItemBtn &&
                    <Button color="gray" onClick={addItemBtnAction}>
                        {addItemBtnText ?? "Crear nuevo"}
                    </Button>
                }
            </div>
        </section>
    )
}

CardsList.defaultProps = {
    showAddItemBtn: false
}
