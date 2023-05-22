import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import FileInfo from "../types/FileInfo";
import Material from "../types/Material";
import Task from '../types/Task';
import TaskCard from '../components/cards/taskCard';
import TasksFilter from '../components/tasksFilter';
import TaskForm from '../components/forms/taskForm';
import Tool from "../types/Tool";

const DEFAULT_TASK_TYPES = ['on_hold', 'in_progress'];

export default function TasksView() {
    // Hooks for state variables
    const [tasks, setTasks] = useState<Task[]>([]);
    const [availableTools, setAvailableTools] = useState<Tool[]>([])
    const [availableMaterials, setAvailableMaterials] = useState<Material[]>([])
    const [availableFiles, setAvailableFiles] = useState<FileInfo[]>([])

    const [taskTypes, setTaskTypes] = useState<string[]>(DEFAULT_TASK_TYPES);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

    /*  Function: showCreateTaskFormModal
    *   Description: Enables the modal to upload a new task
    */
    function showCreateTaskFormModal() {
        setShowTaskForm(true);
    }

    /*  Function: hideTaskFormModal
    *   Description: Disables the modal to upload a new task
    */
    function hideTaskFormModal() {
        setShowTaskForm(false);
    }

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest('files', 'GET')
            .then(data => {
                setAvailableFiles(data);
            })
            .catch(error => {
                console.log('Connection error: ', error.message);
            });

        apiRequest('materials', 'GET')
            .then(data => {
                setAvailableMaterials(data);
            })
            .catch(error => {
                console.log('Connection error: ', error.message);
            });

        apiRequest('tasks', 'GET')
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.log('Connection error: ', error.message);
            });

        apiRequest('tools', 'GET')
            .then(data => {
                setAvailableTools(data);
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
            <CardsList
                title='Tareas'
                addItemBtnText='Solicitar pedido'
                addItemBtnAction={showCreateTaskFormModal}
                showAddItemBtn
            >
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
                                        toolsList={availableTools}
                                        materialsList={availableMaterials}
                                        filesList={availableFiles}
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showTaskForm &&
                <TaskForm
                    exitAction={hideTaskFormModal}
                    create={true}
                    toolsList={availableTools}
                    materialsList={availableMaterials}
                    filesList={availableFiles}
                />
            }
        </>
    )
}
