import { useEffect } from 'react';
import { useRouter } from "next/router";

import apiRequest from '../services/apiService';
import config from '../config';
import MenuOption from '../types/MenuOption';

const options: MenuOption[] = [
    {
        name: 'Ver estado de tareas',
        description: '',
        path: '/tasks',
    },
    {
        name: 'Monitorizar equipo',
        description: '',
        path: '#',
    },
    {
        name: 'Administrar archivos',
        description: '',
        path: '/files',
    },
    {
        name: 'Control manual y calibración',
        description: '',
        path: '#',
    },
    {
        name: 'Administrar solicitudes',
        description: '',
        path: '/requests',
    },
    {
        name: 'Administrar usuarios',
        description: '',
        path: '/users',
    },
    {
        name: 'Administrar inventario',
        description: '',
        path: '/inventory',
    },
]

export default function MainMenu() {
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const { JWT_NAME } = config;
        const callbackUrl = "";
        const token = localStorage.getItem(JWT_NAME);

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
        }

        apiRequest('users/auth', 'GET')
            .then((response) => {
                if (response.data) {
                    // Do nothing, it worked!
                }
                if (response.error) {
                    router.push(`/login?callbackUrl=${callbackUrl}`);
                }
            })
            .catch(error => router.push(`/login?callbackUrl=${callbackUrl}`));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                    {options.map((option) => (
                        <div key={option.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                            <div>
                                <a href={option.path} className="font-semibold text-gray-900">
                                    {option.name}
                                    <span className="absolute inset-0" />
                                </a>
                                <p className="mt-1 text-gray-600">{option.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
