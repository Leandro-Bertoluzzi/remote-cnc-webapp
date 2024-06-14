import CodeMirror from "@uiw/react-codemirror";
import {
    MdFolderOpen,
    MdOutlineInsertDriveFile,
    MdSave,
    MdSaveAs,
    MdPlayCircleOutline,
} from "react-icons/md";
import { RiUploadCloud2Line, RiDownloadCloud2Line } from "react-icons/ri";
import ToolBar from "./containers/toolBar";
import { useRef, useState, ChangeEvent } from "react";

// Type definitions
interface CodeEditorToolBarProps {
    updateContent: (text: string) => void;
    content: string;
}

function CodeEditorToolBar(props: CodeEditorToolBarProps) {
    const { updateContent, content } = props;

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

    const runFile = () => {
        console.log("Ejecutado");
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
            action: runFile,
            children: <MdPlayCircleOutline size={20} />,
            tooltip: "Ejecutar",
            disabled: true,
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
    const [value, setValue] = useState<string>("");

    const handleChange = (text: string) => {
        setValue(text);
    };

    return (
        <div className="border border-neutral-500">
            <CodeEditorToolBar updateContent={handleChange} content={value} />
            <CodeMirror
                value={value}
                height="300px"
                basicSetup={{
                    allowMultipleSelections: false,
                    indentOnInput: false,
                }}
                onChange={handleChange}
            />
        </div>
    );
}
