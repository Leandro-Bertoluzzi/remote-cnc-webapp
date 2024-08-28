"use client";

import { AiOutlineStop, AiOutlineHome } from "react-icons/ai";
import ConfirmDialog from "./dialogs/confirmDialog";
import { GrTask } from "react-icons/gr";
import { HiOutlineUsers } from "react-icons/hi2";
import Link from "next/link";
import { MdOutlineGamepad } from "react-icons/md";
import { MouseEventHandler, useState } from "react";
import { Navbar } from "flowbite-react";
import { PiFiles, PiToolbox } from "react-icons/pi";

export function NavigationBar() {
    const [confirm, setConfirm] = useState(false);

    // Handlers
    const handleEmergencyStop: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        setConfirm(true);
    };

    const requestEmergencyStop = () => {
        console.log("Solicitar parada de emergencia");
        setConfirm(false);
    };

    return (
        <>
            <Navbar rounded>
                <Navbar.Brand as={Link} href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        CNC remoto
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2 p-1 border rounded border-red-600">
                    Equipo: Habilitado
                </div>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link onClick={handleEmergencyStop} href="#">
                        <AiOutlineStop size={20} color="red" />
                    </Navbar.Link>
                    <Navbar.Link href="/"><AiOutlineHome size={20} /></Navbar.Link>
                    <Navbar.Link href="/tasks"><GrTask size={20} /></Navbar.Link>
                    <Navbar.Link href="/files"><PiFiles size={20} /></Navbar.Link>
                    <Navbar.Link href="/control"><MdOutlineGamepad size={20} /></Navbar.Link>
                    <Navbar.Link href="/users"><HiOutlineUsers size={20} /></Navbar.Link>
                    <Navbar.Link href="/inventory"><PiToolbox size={20} /></Navbar.Link>
                </Navbar.Collapse>
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
