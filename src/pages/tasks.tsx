import { useState, useEffect } from 'react';
import TaskCard from '../components/taskCard';
import CardsList from '../components/cardsList';
import Task from '../types/Task';
import config from '../config';

export default function TasksView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const { API_PORT, API_HOST } = config;

    /*  Function: updateTasks
    *   Description: Initializes the array of tasks to display
    */
    function updateTasks() {
        const apiBaseUrl = `http://${API_HOST}:${API_PORT}`;

        fetch(`${apiBaseUrl}/tasks`)
            .then((res) => res.json())
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });
    }

    // Action to execute at the beginning
    useEffect(() => updateTasks(), []);
    return (
        <CardsList title="Tareas">
            <div className="flex flex-wrap -m-3">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
            {tasks.length === 0 &&
                <div className="flex flex-wrap -m-3">
                    There are no tasks
            </div>
            }
        </CardsList>
    )
}
