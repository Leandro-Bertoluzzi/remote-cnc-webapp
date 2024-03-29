import { useEffect } from "react";
import { useRouter } from "next/router";

import apiRequest from "../services/apiService";
import { getJwtToken } from "../services/storage";
import MenuOption from "../types/MenuOption";
import { Card } from "flowbite-react";

const options: MenuOption[] = [
    {
        name: "Ver estado de tareas",
        description: "",
        path: "/tasks",
    },
    {
        name: "Monitorizar equipo",
        description: "",
        path: "#",
    },
    {
        name: "Administrar archivos",
        description: "",
        path: "/files",
    },
    {
        name: "Control manual y calibración",
        description: "",
        path: "#",
    },
    {
        name: "Administrar solicitudes",
        description: "",
        path: "/requests",
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

export default function MainMenu() {
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
            return;
        }

        apiRequest("users/auth", "GET")
            .then(() => {
                // Do nothing, it worked!
            })
            .catch(() => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <Card className="w-screen max-w-md max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                {options.map((option) => (
                    <div
                        key={option.name}
                        className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                    >
                        <div>
                            <a href={option.path} className="font-semibold text-gray-900">
                                {option.name}
                                <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">{option.description}</p>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
}
