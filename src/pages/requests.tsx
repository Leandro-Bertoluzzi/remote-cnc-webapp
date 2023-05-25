import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import apiRequest from '../services/apiService';
import config from '../config';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import Task from '../types/Task';
import RequestCard from '../components/cards/requestCard';

export default function RequestsView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isValidated, setIsValidated] = useState<boolean>(false);

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const { JWT_NAME } = config;
        const callbackUrl = "requests";
        const token = localStorage.getItem(JWT_NAME);

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
        }

        apiRequest('users/auth', 'GET')
            .then((response) => {
                if (response.data) {
                    setIsValidated(true);
                }
                if (response.error) {
                    router.push(`/login?callbackUrl=${callbackUrl}`);
                }
            })
            .catch(error => router.push(`/login?callbackUrl=${callbackUrl}`));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Action to execute at the beginning
    useEffect(() => {
        if (!isValidated) { return; }

        const url = 'tasks?status=pending_approval';

        apiRequest(url, 'GET')
        .then(data => {
            setTasks(data);
        })
        .catch(error => {
            console.log("Connection error: ", error.message);
        });
    }, [isValidated]);

    return (
        <CardsList title="Solicitudes">
            {tasks.length === 0 ? (
                <EmptyCard itemName="solicitudes" />
            ) : (
                    <>
                        {
                            tasks.map((task) => (
                                <RequestCard
                                    key={task.id}
                                    task={task}
                                />
                            ))
                        }
                    </>
                )
            }
        </CardsList>
    )
}
