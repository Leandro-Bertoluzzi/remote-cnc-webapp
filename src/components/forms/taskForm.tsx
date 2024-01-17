import { useState, useEffect } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import ItemsSelect from '../discrete/itemsSelect';
import LabeledTextArea from '../discrete/labeledTextArea';
import LabeledTextInput from '../discrete/labeledTextInput';
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
        setError,
        setNotification
    } = props;

    // Hooks for state variables
    const [taskName, setTaskName] = useState<string>();
    const [taskTool, setTaskTool] = useState<number>();
    const [taskMaterial, setTaskMaterial] = useState<number>();
    const [taskFile, setTaskFile] = useState<number>();
    const [taskNote, setTaskNote] = useState<string>();

    // Action to execute at the beginning
    useEffect(() => {
        if (taskInfo) {
            setTaskName(taskInfo.name);
            setTaskTool(taskInfo.tool_id);
            setTaskMaterial(taskInfo.material_id);
            setTaskFile(taskInfo.file_id);
            return;
        }

        if (!toolsList[0] || !materialsList[0] || !filesList[0]) {
            return;
        }

        setTaskName("");
        setTaskTool(toolsList[0].id);
        setTaskMaterial(materialsList[0].id);
        setTaskFile(filesList[0].id);
    }, [taskInfo, toolsList, materialsList, filesList]);

    const handleTaskNameChange = (taskName: string) => {
        setTaskName(taskName);
    };

    const handleTaskToolChange = (toolId: number) => {
        setTaskTool(toolId);
    };

    const handleTaskMaterialChange = (materialId: number) => {
        setTaskMaterial(materialId);
    };

    const handleTaskFileChange = (fileId: number) => {
        setTaskMaterial(fileId);
    };

    const handleTaskNoteChange = (taskNote: string) => {
        setTaskNote(taskNote);
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
                setNotification(response.success);
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
                setNotification(response.success);
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
                <LabeledTextInput
                    label="Nombre"
                    name="task-name"
                    placeholder="Nombre de tarea"
                    value={taskName}
                    handleChange={handleTaskNameChange}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <ItemsSelect
                    label="Herramienta"
                    name="task-tool"
                    selectedOption={taskTool}
                    handleChange={handleTaskToolChange}
                    items={toolsList}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <ItemsSelect
                    label="Material"
                    name="task-material"
                    selectedOption={taskMaterial}
                    handleChange={handleTaskMaterialChange}
                    items={materialsList}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <ItemsSelect
                    label="Archivo"
                    name="task-file"
                    selectedOption={taskFile}
                    handleChange={handleTaskFileChange}
                    items={filesList}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledTextArea
                    label="Nota adicional"
                    name="task-note"
                    handleChange={handleTaskNoteChange}
                    value={taskNote}
                    placeholder="Puedes dejar una nota aquí..."
                />
            </div>
        </BaseForm>
    )
}
