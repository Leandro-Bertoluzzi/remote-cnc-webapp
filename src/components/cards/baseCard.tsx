import AssociativeArray from "../../types/AssociativeArray";
import CardProps from "../../types/CardProps";
import { Button } from "flowbite-react";

export const BUTTON_DOWNLOAD: string = "descargar";
export const BUTTON_EDIT: string = "editar";
export const BUTTON_REMOVE: string = "eliminar";
export const BUTTON_APPROVE: string = "aprobar";
export const BUTTON_REJECT: string = "rechazar";
export const BUTTON_CANCEL: string = "cancelar";

const BUTTON_COLOR_MAP: AssociativeArray = {
    [BUTTON_DOWNLOAD]: "teal",
    [BUTTON_EDIT]: "indigo",
    [BUTTON_REMOVE]: "red",
    [BUTTON_APPROVE]: "green",
    [BUTTON_REJECT]: "red",
    [BUTTON_CANCEL]: "red",
};

export default function BaseCard(props: CardProps) {
    // Props
    const { mainText, additionalText, buttons } = props;

    // Auxiliary methods
    const computeColor = (type: string): string => {
        return BUTTON_COLOR_MAP[type.toLowerCase()];
    };

    const computeText = (type: string): string => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <div className="w-full border-t p-3">
            <div className="-m-2 flex flex-wrap items-center justify-between">
                <div className="w-auto p-2">
                    <div className="-m-1.5 flex flex-wrap items-center">
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
                {buttons && (
                    <Button.Group>
                        {buttons.map((button, key: number) => (
                            <Button
                                key={key}
                                color={computeColor(button.type)}
                                onClick={button.action}
                            >
                                {computeText(button.type)}
                            </Button>
                        ))}
                    </Button.Group>
                )}
            </div>
        </div>
    );
}
