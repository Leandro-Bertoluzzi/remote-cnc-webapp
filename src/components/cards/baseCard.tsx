import ButtonGroup from "@/components/containers/buttonGroup";
import ButtonInfo from "@/types/ButtonInfo";

export interface CardProps {
    mainText: string;
    additionalText: string[];
    buttons: ButtonInfo[];
}

export default function BaseCard(props: CardProps) {
    const { mainText, additionalText, buttons } = props;

    return (
        <div className="w-full border-t p-3">
            <div className="flex flex-wrap items-center justify-between">
                <div className="w-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="w-auto p-1.5">
                            <h3 className="font-heading mb-1 font-semibold">{mainText}</h3>
                            {additionalText.map((text, key: number) => (
                                <p key={key} className="text-xs text-neutral-500">
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    );
}
