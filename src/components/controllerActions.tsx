import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdOutlineGamepad } from "react-icons/md";
import TabGroup from "./containers/tabGroup";

const tabs = [
    {
        title: "Acciones",
        icon: HiAdjustments,
        content: <>Acciones de control...</>
    },
    {
        title: "Macros",
        icon: HiClipboardList,
        content: <>Algunas macros...</>
    },
    {
        title: "Joystick",
        icon: MdOutlineGamepad,
        content: <>Modo jogging...</>
    },
]

export default function ControllerActions() {
    return (
        <TabGroup items={tabs} />
    );
}
