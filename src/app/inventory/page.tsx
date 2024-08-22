"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import ConfirmDialog from "@/components/dialogs/confirmDialog";
import EmptyCard from "@/components/cards/emptyCard";
import Loader from "@/components/discrete/loader";
import Material from "@/types/Material";
import MaterialCard from "@/components/cards/materialCard";
import MaterialForm from "@/components/forms/materialForm";
import Tool from "@/types/Tool";
import ToolCard from "@/components/cards/toolCard";
import ToolForm from "@/components/forms/toolForm";
import useAuth from "@/hooks/useauth";
import { useNotification } from "@/contexts/notificationContext";
import { useState, useEffect, useCallback } from "react";

export default function InventoryView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

    const [modalState, setModalState] = useState({
        materials: {
            create: false,
            update: false,
            remove: false,
        },
        tools: {
            create: false,
            update: false,
            remove: false,
        },
    });

    // User authentication
    const authorized = useAuth(true);

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Event handlers
    const handleToolModalToggle = (
        modalType: keyof (typeof modalState)["tools"],
        show: boolean,
        tool: Tool | null = null
    ) => {
        const newModalState = modalState;
        newModalState["tools"][modalType] = show;

        setModalState((prevState) => ({
            ...prevState,
            ...newModalState,
        }));
        setSelectedTool(tool);
    };

    const handleMaterialModalToggle = (
        modalType: keyof (typeof modalState)["materials"],
        show: boolean,
        material: Material | null = null
    ) => {
        const newModalState = modalState;
        newModalState["materials"][modalType] = show;

        setModalState((prevState) => ({
            ...prevState,
            ...newModalState,
        }));
        setSelectedMaterial(material);
    };

    const removeTool = () => {
        if (!selectedTool) {
            handleToolModalToggle("remove", false);
            return;
        }

        const url = `tools/${selectedTool.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message))
            .finally(() => handleToolModalToggle("remove", false));
    };

    const removeMaterial = () => {
        if (!selectedMaterial) {
            handleMaterialModalToggle("remove", false);
            return;
        }

        const url = `materials/${selectedMaterial.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message))
            .finally(() => handleMaterialModalToggle("remove", false));
    };

    // Action to execute at the beginning
    const queryItems = useCallback(async () => {
        try {
            const [materials, tools] = await Promise.all([
                apiRequest("materials", "GET"),
                apiRequest("tools", "GET"),
            ]);

            setMaterials(materials);
            setTools(tools);
        } catch (error) {
            if (error instanceof Error) {
                showErrorDialog(error.message);
            }
        }
    }, [showErrorDialog]);

    useEffect(() => {
        if (authorized) {
            queryItems();
        }
    }, [authorized, queryItems]);

    if (!authorized) {
        return <Loader />;
    }

    const toolInfo = selectedTool ? { toolInfo: selectedTool } : {};
    const materialInfo = selectedMaterial ? { materialInfo: selectedMaterial } : {};

    return (
        <>
            <CardsList
                title="Herramientas"
                addItemBtnText="Agregar herramienta"
                addItemBtnAction={() => handleToolModalToggle("create", true)}
                showAddItemBtn
            >
                {tools.length === 0 ? (
                    <EmptyCard itemName="herramientas configuradas" />
                ) : (
                    <>
                        {tools.map((tool) => (
                            <ToolCard
                                key={tool.id}
                                tool={tool}
                                onEdit={() => handleToolModalToggle("update", true, tool)}
                                onRemove={() => handleToolModalToggle("remove", true, tool)}
                            />
                        ))}
                    </>
                )}
            </CardsList>

            <CardsList
                title="Materiales"
                addItemBtnText="Agregar material"
                addItemBtnAction={() => handleMaterialModalToggle("create", true)}
                showAddItemBtn
            >
                {materials.length === 0 ? (
                    <EmptyCard itemName="materiales guardados" />
                ) : (
                    <>
                        {materials.map((material) => (
                            <MaterialCard
                                key={material.id}
                                material={material}
                                onEdit={() => handleMaterialModalToggle("update", true, material)}
                                onRemove={() => handleMaterialModalToggle("remove", true, material)}
                            />
                        ))}
                    </>
                )}
            </CardsList>
            {(modalState.tools.create || modalState.tools.update) && (
                <ToolForm
                    exitAction={() =>
                        handleToolModalToggle(modalState.tools.create ? "create" : "update", false)
                    }
                    create={modalState.tools.create}
                    {...toolInfo}
                />
            )}
            {(modalState.materials.create || modalState.materials.update) && (
                <MaterialForm
                    exitAction={() =>
                        handleMaterialModalToggle(
                            modalState.materials.create ? "create" : "update",
                            false
                        )
                    }
                    create={modalState.materials.create}
                    {...materialInfo}
                />
            )}
            {modalState.tools.remove && selectedTool && (
                <ConfirmDialog
                    title="Eliminar herramienta"
                    text="¿Está seguro de que desea eliminar la herramienta? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeTool}
                    onCancel={() => handleToolModalToggle("remove", false)}
                />
            )}
            {modalState.materials.remove && selectedMaterial && (
                <ConfirmDialog
                    title="Eliminar material"
                    text="¿Está seguro de que desea eliminar el material? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeMaterial}
                    onCancel={() => handleMaterialModalToggle("remove", false)}
                />
            )}
        </>
    );
}
