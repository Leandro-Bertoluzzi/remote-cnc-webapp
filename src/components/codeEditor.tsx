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
import { useState } from "react";

function CodeEditorToolBar() {
    // Actions
    const newFile = () => {
        console.log("Creado");
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
        console.log("Importado");
    };
    const exportFile = () => {
        console.log("Exportado");
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

    return <ToolBar options={options} />;
}

export default function CodeEditor() {
    const [value, setValue] = useState<string>("");

    const handleChange = (text: string) => {
        setValue(text);
    };

    return (
        <div className="border border-neutral-500">
            <CodeEditorToolBar />
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
