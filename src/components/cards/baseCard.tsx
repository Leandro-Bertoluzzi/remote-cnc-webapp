import ButtonGroup from "@/components/containers/buttonGroup";
import ButtonInfo from "@/types/ButtonInfo";
import ImgFallback from "../discrete/imgFallback";

export interface CardProps {
    mainText: string;
    additionalText: string[];
    buttons: ButtonInfo[];
    imgSrc?: string;
}

export default function BaseCard(props: CardProps) {
    const { mainText, additionalText, buttons, imgSrc } = props;

    return (
        <div className="w-full border-t p-3">
            <div className="flex flex-wrap items-center justify-between">
                <div className="w-full md:w-auto">
                    <div className="flex flex-wrap items-center">
                        {imgSrc && <ImgFallback imgSrc={imgSrc} />}
                        <div className="w-full p-1.5 md:w-auto">
                            <h3 className="font-heading mb-1 truncate font-semibold">{mainText}</h3>
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
