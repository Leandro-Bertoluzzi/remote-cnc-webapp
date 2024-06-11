import { useState } from "react";
import apiRequest from "../../services/apiService";
import BaseForm from "./baseForm";
import ItemsSelect from "../discrete/itemsSelect";
import LabeledTextArea from "../discrete/labeledTextArea";
import LabeledTextInput from "../discrete/labeledTextInput";
import TaskFormProps from "../../types/TaskFormProps";

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
        setNotification,
    } = props;

    // Initialization
    const initialName = taskInfo ? taskInfo.name : "";
    const initialNote = taskInfo ? taskInfo.note : "";
    const initialTool = taskInfo ? taskInfo.tool_id : toolsList[0]?.id;
    const initialMaterial = taskInfo ? taskInfo.material_id : materialsList[0]?.id;
    const initialFile = taskInfo ? taskInfo.file_id : filesList[0]?.id;

    // Hooks for state variables
    const [taskName, setTaskName] = useState<string>(initialName);
    const [taskNote, setTaskNote] = useState<string>(initialNote);
    const [taskTool, setTaskTool] = useState<number>(initialTool);
    const [taskMaterial, setTaskMaterial] = useState<number>(initialMaterial);
    const [taskFile, setTaskFile] = useState<number>(initialFile);

    // Event handlers

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
        setTaskFile(fileId);
    };

    const handleTaskNoteChange = (taskNote: string) => {
        setTaskNote(taskNote);
    };

    const handleUploadClick = () => {
        const data = {
            name: taskName,
            tool_id: taskTool,
            material_id: taskMaterial,
            file_id: taskFile,
        };

        apiRequest("tasks", "POST", data, true)
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
            name: taskName,
            tool_id: taskTool,
            material_id: taskMaterial,
            file_id: taskFile,
        };
        const dataUpdateStatus = {
            status: "pending_approval",
        };
        const urlUpdateTask = `tasks/${taskInfo?.id}`;
        const urlUpdateStatus = `tasks/${taskInfo?.id}/status`;

        // We update the task and then we ask for approval again,
        // since we made changes to the task
        apiRequest(urlUpdateTask, "PUT", dataUpdateTask, true)
            .then(() => apiRequest(urlUpdateStatus, "PUT", dataUpdateStatus, true))
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
            title={create ? "Nueva tarea" : "Editar tarea"}
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
    );
}
