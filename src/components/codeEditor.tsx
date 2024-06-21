import CodeMirror from "@uiw/react-codemirror";
import {
    MdFolderOpen,
    MdOutlineInsertDriveFile,
    MdSave,
    MdSaveAs,
    MdPlayCircleOutline,
    MdPauseCircleOutline,
    MdOutlineStopCircle,
} from "react-icons/md";
import { RiUploadCloud2Line, RiDownloadCloud2Line } from "react-icons/ri";
import ToolBar from "./containers/toolBar";
import { useRef, useState, ChangeEvent } from "react";
import apiRequest from "@/services/apiService";

// Type definitions
interface CodeEditorToolBarProps {
    updateContent: (text: string) => void;
    setContentLocked: (locked: boolean) => void;
    content: string;
}

function CodeEditorToolBar(props: CodeEditorToolBarProps) {
    const { updateContent, setContentLocked, content } = props;

    // State
    const [paused, setPaused] = useState<boolean>(false);
    const [running, setRunning] = useState<boolean>(false);

    // References
    const refImport = useRef<HTMLInputElement>(null);
    const refExport = useRef<HTMLAnchorElement>(null);

    // Handlers
    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        event.stopPropagation();
        if (event.target.files) {
            const reader = new FileReader();
            reader.onload = function () {
                updateContent(reader.result?.toString() || "");
            };
            reader.readAsText(event.target.files[0]);
        }
    }

    // Auxiliary methods
    const runFile = async () => {
        for (const line of content.split(/\r?\n/)) {
            await apiRequest("cnc/command", "POST", { command: line }, true);
        }
    };

    // Actions
    const newFile = () => {
        updateContent("");
    };

    const openFile = () => {
        console.log("Abierto");
    };

    const saveFile = () => {
        console.log("Guardado");
    };

    const saveFileAs = () => {
        console.log("Guardado (como)");
    };

    const importFile = () => {
        refImport.current?.click();
    };

    const exportFile = () => {
        const anchor = refExport.current;
        if (!anchor) return;

        anchor.download = "export.gcode";
        const blob = new Blob([content]);
        anchor.href = URL.createObjectURL(blob);
        anchor.addEventListener("click", () => {
            setTimeout(() => URL.revokeObjectURL(anchor.href), 30 * 1000);
        });
        anchor.click();
    };

    const startRunFile = () => {
        setContentLocked(true);
        setRunning(true);

        runFile()
            .then(() => {
                console.log("Terminada la ejecución!");
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setContentLocked(false);
                setRunning(false);
                setPaused(false);
            });
    };

    const pauseRunFile = () => {
        setPaused(true);
        console.log("Pausado!");
    };

    const resumeRunFile = () => {
        setPaused(false);
        console.log("Retomado!");
    };

    const stopRunFile = () => {
        console.log("Detenido!");
    };

    // Options
    const options = [
        {
            action: newFile,
            children: <MdOutlineInsertDriveFile size={20} />,
            tooltip: "Nuevo",
        },
        {
            action: openFile,
            children: <MdFolderOpen size={20} />,
            tooltip: "Abrir",
        },
        {
            action: saveFile,
            children: <MdSave size={20} />,
            tooltip: "Guardar",
        },
        {
            action: saveFileAs,
            children: <MdSaveAs size={20} />,
            tooltip: "Guardar como",
        },
        {
            action: importFile,
            children: <RiUploadCloud2Line size={20} />,
            tooltip: "Importar",
        },
        {
            action: exportFile,
            children: <RiDownloadCloud2Line size={20} />,
            tooltip: "Exportar",
        },
        {
            action: running ? (paused ? resumeRunFile : pauseRunFile) : startRunFile,
            children: running ? (
                paused ? (
                    <MdPlayCircleOutline size={20} />
                ) : (
                    <MdPauseCircleOutline size={20} />
                )
            ) : (
                <MdPlayCircleOutline size={20} />
            ),
            tooltip: running ? (paused ? "Retomar" : "Pausar") : "Ejecutar",
        },
        {
            action: stopRunFile,
            children: <MdOutlineStopCircle size={20} />,
            tooltip: "Detener",
            disabled: !running,
        },
    ];

    return (
        <>
            <ToolBar options={options} />
            <input ref={refImport} type="file" className="hidden" onChange={handleFileChange} />
            <a ref={refExport} href="#" className="hidden" />
        </>
    );
}

export default function CodeEditor() {
    const [readonly, setReadOnly] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    const handleChange = (text: string) => {
        setValue(text);
    };

    const handleLockContent = (locked: boolean) => {
        setReadOnly(locked);
    };

    return (
        <div className="border border-neutral-500">
            <CodeEditorToolBar
                updateContent={handleChange}
                setContentLocked={handleLockContent}
                content={value}
            />
            <CodeMirror
                value={value}
                height="300px"
                basicSetup={{
                    allowMultipleSelections: false,
                    indentOnInput: false,
                }}
                onChange={handleChange}
                readOnly={readonly}
            />
        </div>
    );
}
