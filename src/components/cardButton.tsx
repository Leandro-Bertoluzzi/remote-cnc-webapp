export const BUTTON_DOWNLOAD = 'descargar';
export const BUTTON_EDIT = 'editar';
export const BUTTON_REMOVE = 'eliminar';
export const BUTTON_APPROVE = 'aprobar';
export const BUTTON_REJECT = 'rechazar';
export const BUTTON_CANCEL = 'cancelar';

const HOVER_COLOR_MAP: any = {
    'descargar': 'bg-sky-200',
    'editar': 'bg-green-200',
    'eliminar': 'bg-red-200',
    'aprobar': 'bg-green-200',
    'rechazar': 'bg-red-200',
    'cancelar': 'bg-red-200',
};

export default function CardButton(props: any) {
    const {buttonType, isFirst} = props;

    const buttonHoverColor = HOVER_COLOR_MAP[buttonType.toLowerCase()];
    const buttonText = buttonType.charAt(0).toUpperCase() + buttonType.slice(1);

    return (
        <div className={`${isFirst ? "ml-auto " : ""}p-2 w-auto`}>
            <a className={`inline-flex flex-wrap items-center px-6 py-2.5 text-sm font-medium border hover:${buttonHoverColor} rounded-lg`} href="#">
                {buttonText}
            </a>
        </div>
    )
  }