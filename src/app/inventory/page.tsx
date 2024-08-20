"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
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

export default function InventoryView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [showToolForm, setShowToolForm] = useState<boolean>(false);
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);

    // User authentication
    const authorized = useAuth(true);

    // Context
    const { showErrorDialog } = useNotification();

    // Actions
    const toggleFormModal = (formType: "tool" | "material", show: boolean) => {
        if (formType === "tool") {
            setShowToolForm(show);
        } else {
            setShowMaterialForm(show);
        }
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
                addItemBtnAction={() => toggleFormModal("tool", true)}
                showAddItemBtn
            >
                {tools.length === 0 ? (
                    <EmptyCard itemName="herramientas configuradas" />
                ) : (
                    <>
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </>
                )}
            </CardsList>

            <CardsList
                title="Materiales"
                addItemBtnText="Agregar material"
                addItemBtnAction={() => toggleFormModal("material", true)}
                showAddItemBtn
            >
                {materials.length === 0 ? (
                    <EmptyCard itemName="materiales guardados" />
                ) : (
                    <>
                        {materials.map((material) => (
                            <MaterialCard key={material.id} material={material} />
                        ))}
                    </>
                )}
            </CardsList>
            {showToolForm && (
                <ToolForm exitAction={() => toggleFormModal("tool", false)} create={true} />
            )}
            {showMaterialForm && (
                <MaterialForm exitAction={() => toggleFormModal("material", false)} create={true} />
            )}
        </>
    );
}
