"use client";

import { Card } from "flowbite-react";
import withAuthentication from "@/components/wrappers/withAuthentication";

interface MenuOption {
    name: string;
    description: string;
    path: string;
}

const options: MenuOption[] = [
    {
        name: "Ver estado de tareas",
        description: "",
        path: "/tasks",
    },
    {
        name: "Administrar archivos",
        description: "",
        path: "/files",
    },
    {
        name: "Control manual y monitoreo",
        description: "",
        path: "/control",
    },
    {
        name: "Administrar usuarios",
        description: "",
        path: "/users",
    },
    {
        name: "Administrar inventario",
        description: "",
        path: "/inventory",
    },
];

function MainMenu() {
    return (
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <Card className="w-screen max-w-md max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                {options.map((option) => (
                    <div
                        key={option.name}
                        className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                    >
                        <a href={option.path} className="font-semibold text-gray-900">
                            {option.name}
                            <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{option.description}</p>
                    </div>
                ))}
            </Card>
        </div>
    );
}

export default withAuthentication(MainMenu);
