import AssociativeArray from "@/types/AssociativeArray";
import { Button } from "flowbite-react";
import ButtonInfo from "@/types/ButtonInfo";

// Constants

export const BUTTON_DOWNLOAD = "descargar";
export const BUTTON_EDIT = "editar";
export const BUTTON_REMOVE = "eliminar";
export const BUTTON_APPROVE = "aprobar";
export const BUTTON_CANCEL = "cancelar";
export const BUTTON_PAUSE = "pausar";
export const BUTTON_REPEAT = "repetir";
export const BUTTON_RESTORE = "restaurar";
export const BUTTON_RESUME = "retomar";
export const BUTTON_RETRY = "reintentar";
export const BUTTON_RUN = "ejecutar";
export const BUTTON_CREATE_TASK = "crear tarea";

const BUTTON_COLOR_MAP: AssociativeArray = {
    [BUTTON_DOWNLOAD]: "teal",
    [BUTTON_EDIT]: "indigo",
    [BUTTON_REMOVE]: "red",
    [BUTTON_APPROVE]: "green",
    [BUTTON_CANCEL]: "red",
    [BUTTON_PAUSE]: "yellow",
    [BUTTON_REPEAT]: "indigo",
    [BUTTON_RESTORE]: "indigo",
    [BUTTON_RESUME]: "green",
    [BUTTON_RETRY]: "indigo",
    [BUTTON_RUN]: "green",
    [BUTTON_CREATE_TASK]: "green",
};

// Types definition

export interface CardButtonProps {
    info: ButtonInfo;
}

// Component

export default function CardButton(props: CardButtonProps) {
    // Props
    const { info } = props;

    // Auxiliary methods
    const computeColor = (type: string): string => {
        return BUTTON_COLOR_MAP[type.toLowerCase()] ?? "light";
    };

    const computeText = (type: string): string => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    // Render

    return (
        <Button color={computeColor(info.type)} onClick={info.action}>
            {computeText(info.type)}
        </Button>
    );
}
