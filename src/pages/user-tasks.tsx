import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import Task from '../types/Task';
import TaskCard from '../components/cards/taskCard';
import TasksFilter from '../components/tasksFilter';

const DEFAULT_TASK_TYPES = ['on_hold', 'in_progress'];

export default function TasksView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTypes, setTaskTypes] = useState<string[]>(DEFAULT_TASK_TYPES);

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest('tasks', 'GET')
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.log('Connection error: ', error.message);
            });
    }, []);

    // Methods
    const updateTaskStatusList = (status: string, add: boolean) => {
        // Search for status
        const index = taskTypes.indexOf(status);

        // Add status
        if (add) {
            if (index !== -1) {
                return;
            }
            setTaskTypes(prevStatuses => [...prevStatuses, status]);
            return;
        }

        // Remove status
        if (index === -1) {
            return;
        }
        setTaskTypes((prevStatuses) =>
            prevStatuses.filter((element) => element !== status)
        );
    };

    return (
        <>
            <CardsList title='Tareas' addItemBtnText='Solicitar pedido' showAddItemBtn>
                {tasks.length === 0 ? (
                    <EmptyCard itemName='tareas programadas' />
                ) : (
                        <>
                            <TasksFilter
                                initialStatus={DEFAULT_TASK_TYPES}
                                updateTaskStatusList={updateTaskStatusList}
                            />
                            {
                                tasks.map((task) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        show={taskTypes.includes(task.status)}
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
        </>
    )
}
