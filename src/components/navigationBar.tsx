"use client";

import { AiOutlineStop, AiOutlineHome } from "react-icons/ai";
import { Button, Navbar } from "flowbite-react";
import ConfirmDialog from "./dialogs/confirmDialog";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { GrTask } from "react-icons/gr";
import { HiOutlineUsers } from "react-icons/hi2";
import LabeledIcon from "./discrete/labeledIcon";
import Link from "next/link";
import { MdOutlineGamepad } from "react-icons/md";
import { MouseEventHandler, useState } from "react";
import { PiFiles, PiToolbox } from "react-icons/pi";
import useScreenSize from "@/hooks/useScreenSize";
import { useWorkerStatus } from "@/contexts/workerContext";

const customTheme: CustomFlowbiteTheme["navbar"] = {
    collapse: {
        list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-4 md:text-sm md:font-medium",
    },
};

const links = [
    {
        url: "/",
        icon: AiOutlineHome,
        label: "Inicio",
    },
    {
        url: "/tasks",
        icon: GrTask,
        label: "Tareas",
    },
    {
        url: "/files",
        icon: PiFiles,
        label: "Archivos",
    },
    {
        url: "/control",
        icon: MdOutlineGamepad,
        label: "Control",
    },
    {
        url: "/users",
        icon: HiOutlineUsers,
        label: "Usuarios",
    },
    {
        url: "/inventory",
        icon: PiToolbox,
        label: "Inventario",
    },
];

function DeviceStatus({ onStop }: { onStop: () => void }) {
    // Context
    const { workerStatus } = useWorkerStatus();

    // Calculated values
    const status = workerStatus.available
        ? "Disponible"
        : workerStatus.running
          ? "Ocupado"
          : "Deshabilitado";

    // Event handlers
    const handleEmergencyStop: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onStop();
    };

    return (
        <>
            <Button onClick={handleEmergencyStop} color="light">
                <AiOutlineStop size={20} color="red" /> Detener
            </Button>
            <Button as="span" color="light">
                {`Equipo: ${status}`}
            </Button>
        </>
    );
}

export function NavigationBar() {
    const screenSize = useScreenSize();
    const [confirm, setConfirm] = useState(false);

    // Handlers
    const handleEmergencyStop = () => {
        setConfirm(true);
    };

    const requestEmergencyStop = () => {
        console.log("Solicitar parada de emergencia");
        setConfirm(false);
    };

    return (
        <>
            <Navbar theme={customTheme}>
                <Navbar.Brand as={Link} href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        CNC remoto
                    </span>
                </Navbar.Brand>
                {screenSize.width > 1023 && <DeviceStatus onStop={handleEmergencyStop} />}
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {links.map((link) => (
                        <Navbar.Link key={link.label} href={link.url}>
                            <LabeledIcon Icon={link.icon} label={link.label} />
                        </Navbar.Link>
                    ))}
                </Navbar.Collapse>
            </Navbar>
            <Navbar className="lg:hidden">
                <DeviceStatus onStop={handleEmergencyStop} />
            </Navbar>
            {confirm && (
                <ConfirmDialog
                    title="PARADA DE EMERGENCIA"
                    text="¿Desea solicitar una parada de emergencia?"
                    confirmText="Confirmar"
                    onAccept={requestEmergencyStop}
                    onCancel={() => setConfirm(false)}
                />
            )}
        </>
    );
}
