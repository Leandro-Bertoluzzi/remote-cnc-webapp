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
import { useState, useEffect } from "react";

type FormType = "tool" | "material";

export default function InventoryView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [showToolForm, setShowToolForm] = useState<boolean>(false);
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);
    const [create, setCreate] = useState<boolean>(false);

    const [selectedTool, setSelectedTool] = useState<Tool | undefined>(undefined);
    const [showToolConfirmation, setShowToolConfirmation] = useState<boolean>(false);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | undefined>(undefined);
    const [showMaterialConfirmation, setShowMaterialConfirmation] = useState<boolean>(false);

    // User authentication
    const authorized = useAuth(true);

    // Context
    const { showErrorDialog, showNotification } = useNotification();

    // Actions
    const showCreateFormModal = (formType: FormType) => {
        if (formType === "tool") {
            setShowToolForm(true);
        } else {
            setShowMaterialForm(true);
        }
        setCreate(true);
    };

    const toggleUpdateToolModal = (show: boolean, tool?: Tool) => {
        setSelectedTool(tool);
        setCreate(false);
        setShowToolForm(show);
    };

    const toggleUpdateMaterialModal = (show: boolean, material?: Material) => {
        setSelectedMaterial(material);
        setCreate(false);
        setShowMaterialForm(show);
    };

    const toggleToolConfirmation = (show: boolean, tool?: Tool) => {
        setShowToolConfirmation(show);
        setSelectedTool(tool);
    };

    const toggleMaterialConfirmation = (show: boolean, material?: Material) => {
        setShowMaterialConfirmation(show);
        setSelectedMaterial(material);
    };

    const removeTool = () => {
        setShowToolConfirmation(false);

        if (!selectedTool) {
            setSelectedTool(undefined);
            return;
        }

        const url = `tools/${selectedTool.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));

        setSelectedTool(undefined);
    };

    const removeMaterial = () => {
        setShowMaterialConfirmation(false);

        if (!selectedMaterial) {
            setSelectedMaterial(undefined);
            return;
        }

        const url = `materials/${selectedMaterial.id}`;

        apiRequest(url, "DELETE")
            .then((response) => showNotification(response.success))
            .catch((err) => showErrorDialog(err.message));

        setSelectedMaterial(undefined);
    };

    // Action to execute at the beginning
    useEffect(() => {
        async function queryItems() {
            try {
                const materials = await apiRequest("materials", "GET");
                const tools = await apiRequest("tools", "GET");

                setMaterials(materials);
                setTools(tools);
            } catch (error) {
                if (error instanceof Error) {
                    showErrorDialog(error.message);
                }
            }
        }

        if (authorized) {
            queryItems();
        }
    }, [authorized]);

    if (!authorized) {
        return <Loader />;
    }

    return (
        <>
            <CardsList
                title="Herramientas"
                addItemBtnText="Agregar herramienta"
                addItemBtnAction={() => showCreateFormModal("tool")}
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
                                onEdit={() => toggleUpdateToolModal(true, tool)}
                                onRemove={() => toggleToolConfirmation(true, tool)}
                            />
                        ))}
                    </>
                )}
            </CardsList>

            <CardsList
                title="Materiales"
                addItemBtnText="Agregar material"
                addItemBtnAction={() => showCreateFormModal("material")}
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
                                onEdit={() => toggleUpdateMaterialModal(true, material)}
                                onRemove={() => toggleMaterialConfirmation(true, material)}
                            />
                        ))}
                    </>
                )}
            </CardsList>
            {showToolForm && (
                <ToolForm
                    exitAction={() => toggleUpdateToolModal(false)}
                    create={create}
                    toolInfo={selectedTool}
                />
            )}
            {showMaterialForm && (
                <MaterialForm
                    exitAction={() => toggleUpdateMaterialModal(false)}
                    create={create}
                    materialInfo={selectedMaterial}
                />
            )}
            {showToolConfirmation && selectedTool && (
                <ConfirmDialog
                    title="Eliminar herramienta"
                    text="¿Está seguro de que desea eliminar la herramienta? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeTool}
                    onCancel={() => toggleToolConfirmation(false)}
                />
            )}
            {showMaterialConfirmation && selectedMaterial && (
                <ConfirmDialog
                    title="Eliminar material"
                    text="¿Está seguro de que desea eliminar el material? Esta acción no puede deshacerse"
                    confirmText="Eliminar"
                    onAccept={removeMaterial}
                    onCancel={() => toggleMaterialConfirmation(false)}
                />
            )}
        </>
    );
}
