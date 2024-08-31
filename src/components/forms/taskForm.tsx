import { useCallback, useEffect, useState } from "react";
import apiRequest from "@/services/apiService";
import BaseForm from "./baseForm";
import FileInfo from "@/types/FileInfo";
import LabeledSelect from "../discrete/labeledSelect";
import LabeledTextArea from "../discrete/labeledTextArea";
import LabeledTextInput from "../discrete/labeledTextInput";
import Task from "@/types/Task";
import { useNotification } from "@/contexts/notificationContext";
import { useItems } from "@/contexts/itemsContext";

export interface TaskFormProps {
    exitAction: () => void;
    create: boolean;
    taskInfo?: Task;
    fixedFile?: FileInfo;
}

export default function TaskForm(props: TaskFormProps) {
    // Props
    const { exitAction, create, taskInfo, fixedFile } = props;

    // Context
    const { showErrorDialog, showNotification } = useNotification();
    const { files, fetchFiles, materials, fetchMaterials, fetchTasks, tools, fetchTools } =
        useItems();

    // Initialization
    const initialName = taskInfo ? taskInfo.name : "";
    const initialNote = taskInfo ? taskInfo.note : "";
    const initialTool = taskInfo ? taskInfo.tool_id : tools[0]?.id;
    const initialMaterial = taskInfo ? taskInfo.material_id : materials[0]?.id;
    const initialFile = taskInfo ? taskInfo.file_id : files[0]?.id;

    // Hooks for state variables
    const [taskName, setTaskName] = useState<string>(initialName);
    const [taskNote, setTaskNote] = useState<string>(initialNote);
    const [taskTool, setTaskTool] = useState<number>(initialTool);
    const [taskMaterial, setTaskMaterial] = useState<number>(initialMaterial);
    const [taskFile, setTaskFile] = useState<number>(fixedFile ? fixedFile.id : initialFile);

    // Action to execute at the beginning
    const queryItems = useCallback(async () => {
        if (files.length === 0) {
            fetchFiles();
        }
        if (materials.length === 0) {
            fetchMaterials();
        }
        if (tools.length === 0) {
            fetchTools();
        }
    }, [fetchFiles, files, fetchMaterials, materials, fetchTools, tools]);

    useEffect(() => {
        queryItems();
    }, [queryItems]);

    // Event handlers

    const handleTaskNameChange = (taskName: string) => {
        setTaskName(taskName);
    };

    const handleTaskToolChange = (toolId: string) => {
        setTaskTool(parseInt(toolId));
    };

    const handleTaskMaterialChange = (materialId: string) => {
        setTaskMaterial(parseInt(materialId));
    };

    const handleTaskFileChange = (fileId: string) => {
        setTaskFile(parseInt(fileId));
    };

    const handleTaskNoteChange = (taskNote: string) => {
        setTaskNote(taskNote);
    };

    const handleUploadClick = () => {
        const data = {
            name: taskName,
            note: taskNote,
            tool_id: taskTool,
            material_id: taskMaterial,
            file_id: taskFile,
        };

        apiRequest("tasks", "POST", data, true)
            .then((response) => {
                showNotification(response.success);
                fetchTasks();
            })
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    const handleUpdateClick = () => {
        if (!taskInfo) {
            exitAction();
        }

        const dataUpdateTask = {
            name: taskName,
            note: taskNote,
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
                showNotification(response.success);
                fetchTasks();
            })
            .catch((err) => showErrorDialog(err.message));

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
                <LabeledSelect
                    label="Herramienta"
                    name="task-tool"
                    initialValue={taskTool}
                    handleChange={handleTaskToolChange}
                    options={tools.map((tool) => {
                        return { label: tool.name, value: tool.id };
                    })}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledSelect
                    label="Material"
                    name="task-material"
                    initialValue={taskMaterial}
                    handleChange={handleTaskMaterialChange}
                    options={materials.map((mat) => {
                        return { label: mat.name, value: mat.id };
                    })}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledSelect
                    label="Archivo"
                    name="task-file"
                    initialValue={taskFile}
                    handleChange={handleTaskFileChange}
                    disabled={!!fixedFile}
                    options={files.map((file) => {
                        return { label: file.name, value: file.id };
                    })}
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
