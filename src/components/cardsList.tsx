import CardListProps from '../types/CardsListProps';

export default function CardsList(props: CardListProps) {
    const { title, showAddItemBtn, addItemBtnText, addItemBtnAction } = props;

    return (
        <section data-section-id="1" data-share="" data-category="cards" className="py-4 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="pt-5 px-5 pb-6 bg-white border rounded-xl">
                    <h3 className="mb-7 text-lg font-semibold">{title}</h3>
                    <div className="flex flex-wrap -m-3">
                        {props.children}
                    </div>
                </div>
                {showAddItemBtn &&
                    <a onClick={addItemBtnAction} className="inline-flex flex-wrap items-center px-6 py-2.5 text-sm font-medium border rounded-lg bg-white" href="#">
                        {addItemBtnText ?? "Crear nuevo"}
                    </a>
                }
            </div>
        </section>
    )
}
