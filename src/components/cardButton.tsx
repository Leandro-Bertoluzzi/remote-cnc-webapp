import AssociativeArray from '../types/AssociativeArray';
import CardButtonProps from '../types/CardButtonProps';

export const BUTTON_DOWNLOAD: string = 'descargar';
export const BUTTON_EDIT: string = 'editar';
export const BUTTON_REMOVE: string = 'eliminar';
export const BUTTON_APPROVE: string = 'aprobar';
export const BUTTON_REJECT: string = 'rechazar';
export const BUTTON_CANCEL: string = 'cancelar';

const HOVER_COLOR_MAP: AssociativeArray = {
    [BUTTON_DOWNLOAD]: 'bg-sky-200',
    [BUTTON_EDIT]: 'bg-green-200',
    [BUTTON_REMOVE]: 'bg-red-200',
    [BUTTON_APPROVE]: 'bg-green-200',
    [BUTTON_REJECT]: 'bg-red-200',
    [BUTTON_CANCEL]: 'bg-red-200',
};

export default function CardButton(props: CardButtonProps) {
    const { buttonInfo, isFirst } = props;
    const { type, action } = buttonInfo;

    const buttonHoverColor = HOVER_COLOR_MAP[type.toLowerCase()];
    const buttonText = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className={`${isFirst ? "ml-auto " : ""}p-2 w-auto`}>
            <button onClick={action} className={`inline-flex flex-wrap items-center px-6 py-2.5 text-sm font-medium border hover:${buttonHoverColor} rounded-lg`}>
                {buttonText}
            </button>
        </div>
    )
}
