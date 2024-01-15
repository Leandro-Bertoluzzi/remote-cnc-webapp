import { ChangeEvent, useState, useEffect } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import TaskFormProps from '../../types/TaskFormProps';

export default function TaskForm(props: TaskFormProps) {
    // Props
    const {
        exitAction,
        create,
        taskInfo,
        toolsList,
        materialsList,
        filesList,
        setError
    } = props;

    // Hooks for state variables
    const [taskName, setTaskName] = useState<string>();
    const [taskTool, setTaskTool] = useState<number>();
    const [taskMaterial, setTaskMaterial] = useState<number>();
    const [taskFile, setTaskFile] = useState<number>();

    // Action to execute at the beginning
    useEffect(() => {
        if (taskInfo) {
            setTaskName(taskInfo.name);
            setTaskTool(taskInfo.tool_id);
            setTaskMaterial(taskInfo.material_id);
            setTaskFile(taskInfo.file_id);
            return;
        }

        setTaskName("");
        setTaskTool(toolsList[0].id);
        setTaskMaterial(materialsList[0].id);
        setTaskFile(filesList[0].id);
    }, []);

    const handleTaskNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setTaskName(e.target.value);
        }
    };

    const handleTaskToolChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setTaskTool(parseInt(e.target.value));
        }
    };

    const handleTaskMaterialChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setTaskMaterial(parseInt(e.target.value));
        }
    };

    const handleTaskFileChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setTaskFile(parseInt(e.target.value));
        }
    };

    const handleUploadClick = () => {
        const data = {
            "name": taskName,
            "tool_id": taskTool,
            "material_id": taskMaterial,
            "file_id": taskFile
        }

        apiRequest('tasks', 'POST', data, true)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                setError(err.message);
            });

        exitAction();
    };

    const handleUpdateClick = () => {
        if (!taskInfo) {
            exitAction();
        }

        const dataUpdateTask = {
            "name": taskName,
            "tool_id": taskTool,
            "material_id": taskMaterial,
            "file_id": taskFile
        }
        const dataUpdateStatus = {
            "status": 'pending_approval'
        }
        const urlUpdateTask = `tasks/${taskInfo?.id}`;
        const urlUpdateStatus = `tasks/${taskInfo?.id}/status`;

        // We update the task and then we ask for approval again,
        // since we made changes to the task
        apiRequest(urlUpdateTask, 'PUT', dataUpdateTask, true)
            .then((data) => apiRequest(urlUpdateStatus, 'PUT', dataUpdateStatus, true))
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                setError(err.message);
            });

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nuevo pedido" : "Editar pedido"}
            subtitle=""
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText={create ? "Crear" : "Actualizar"}
        >
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="task-name-input">Nombre: </label>
                <input id="task-name-input" type="text" onChange={handleTaskNameChange} value={taskName} />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="task-tool-input">Herramienta: </label>
                <select
                    id="task-tool-input"
                    value={taskTool}
                    onChange={handleTaskToolChange}
                >
                    {
                        toolsList.map((tool) => (
                            <option
                                key={tool.id}
                                value={tool.id}
                            >
                                {tool.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="task-material-input">Material: </label>
                <select
                    id="task-material-input"
                    value={taskMaterial}
                    onChange={handleTaskMaterialChange}
                >
                    {
                        materialsList.map((material) => (
                            <option
                                key={material.id}
                                value={material.id}
                            >
                                {material.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="task-file-input">Archivo: </label>
                <select
                    id="task-file-input"
                    value={taskFile}
                    onChange={handleTaskFileChange}
                >
                    {
                        filesList.map((file) => (
                            <option
                                key={file.id}
                                value={file.id}
                            >
                                {file.file_name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </BaseForm>
    )
}
