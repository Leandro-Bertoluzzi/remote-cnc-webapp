import { ChangeEvent, useState } from 'react';
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
        filesList
    } = props;

    // Hooks for state variables
    const [taskName, setTaskName] = useState<string>(taskInfo.name);
    const [taskTool, setTaskTool] = useState<number>(taskInfo.tool_id);
    const [taskMaterial, setTaskMaterial] = useState<number>(taskInfo.material_id);
    const [taskFile, setTaskFile] = useState<number>(taskInfo.file_id);

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
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    const handleUpdateClick = () => {
        let data = {
            "name": taskName,
            "tool_id": taskTool,
            "material_id": taskMaterial,
            "file_id": taskFile
        }
        let url = `tasks/${taskInfo.id}`;

        apiRequest(url, 'PUT', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        // We ask for approval again, since we made changes to the task
        data = {
            'user_id': taskInfo.user_id,
            "status": 'pending_approval'
        }
        url = `tasks/${taskInfo.id}/status`;

        apiRequest(url, 'PUT', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

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

TaskForm.defaultProps = {
    taskInfo: {
        id: 0,
        name: "",
        tool_id: 0,
        material_id: 0,
        file_id: 0
    }
}
