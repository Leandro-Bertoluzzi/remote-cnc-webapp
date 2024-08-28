"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";

export function NavigationBar() {
    return (
        <Navbar rounded>
            <Navbar.Brand as={Link} href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    CNC remoto
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="/">Inicio</Navbar.Link>
                <Navbar.Link href="/tasks">Tareas</Navbar.Link>
                <Navbar.Link href="/files">Archivos</Navbar.Link>
                <Navbar.Link href="/control">Control</Navbar.Link>
                <Navbar.Link href="/users">Usuarios</Navbar.Link>
                <Navbar.Link href="/inventory">Inventario</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
