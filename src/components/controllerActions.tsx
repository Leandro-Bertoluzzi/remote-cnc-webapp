import ActionsPanel from "./actionsPanel";
import { HiAdjustments, HiClipboardList } from "react-icons/hi";
import Joystick from "./joystick";
import { MdOutlineGamepad } from "react-icons/md";
import PortsList from "./discrete/portsList";
import TabGroup from "./containers/tabGroup";

const tabs = [
    {
        title: "Acciones",
        icon: HiAdjustments,
        content: (
            <>
                <PortsList />
                <ActionsPanel />
            </>
        ),
    },
    {
        title: "Macros",
        icon: HiClipboardList,
        content: <>Algunas macros...</>,
    },
    {
        title: "Joystick",
        icon: MdOutlineGamepad,
        content: (
            <>
                <Joystick />
            </>
        ),
    },
];

export default function ControllerActions() {
    return <TabGroup items={tabs} />;
}
