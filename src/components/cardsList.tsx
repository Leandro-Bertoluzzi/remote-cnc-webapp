import CardListProps from '../types/CardsListProps';

export default function CardsList(props: CardListProps) {
    const { title } = props;

    return (
        <section data-section-id="1" data-share="" data-category="cards" className="py-4 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="pt-5 px-5 pb-6 bg-white border rounded-xl">
                    <h3 className="mb-7 text-lg font-semibold">{title}</h3>
                    {props.children}
                </div>
            </div>
        </section>
    )
}