import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import Task from '../types/Task';
import TaskCard from '../components/cards/taskCard';

export default function RequestsView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);

    // Action to execute at the beginning
    useEffect(() => {
        const url = 'tasks?status=pending_approval';

        apiRequest(url, 'GET')
        .then(data => {
            setTasks(data);
        })
        .catch(error => {
            console.log("Connection error: ", error.message);
        });
    }, []);

    return (
        <CardsList title="Solicitudes">
            {tasks.length === 0 ? (
                <EmptyCard itemName="solicitudes" />
            ) : (
                    <>
                        {
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    show={true}
                                />
                            ))
                        }
                    </>
                )
            }
        </CardsList>
    )
}
