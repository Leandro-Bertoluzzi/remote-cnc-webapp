"use client";

import apiRequest from "@/services/apiService";
import CardsList from "@/components/containers/cardsList";
import EmptyCard from "@/components/cards/emptyCard";
import Loader from "@/components/discrete/loader";
import Material from "@/types/Material";
import MaterialCard from "@/components/cards/materialCard";
import MaterialForm from "@/components/forms/materialForm";
import MessageDialog from "@/components/dialogs/messageDialog";
import { MessageDialogType } from "@/types/MessageDialogProps";
import Tool from "@/types/Tool";
import ToolCard from "@/components/cards/toolCard";
import ToolForm from "@/components/forms/toolForm";
import useAuth from "@/hooks/useauth";
import { useState, useEffect } from "react";

export default function InventoryView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [showToolForm, setShowToolForm] = useState<boolean>(false);
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // User authentication
    const authorized = useAuth();

    // Actions
    const toggleFormModal = (formType: 'tool' | 'material', show: boolean) => {
        if (formType === 'tool') {
            setShowToolForm(show);
        } else {
            setShowMaterialForm(show);
        }
    }

    /*  Function: showErrorDialog
     *   Description: Shows a dialog with information about the error
     */
    function showErrorDialog(message: string) {
        setNotification(message);
        setMessageType("error");
        setMessageTitle("Error de API");
        setShowMessageDialog(true);
    }

    /*  Function: showNotification
     *   Description: Shows a dialog with a notification
     */
    function showNotification(message: string) {
        setNotification(message);
        setMessageType("info");
        setMessageTitle("¡Éxito!");
        setShowMessageDialog(true);
    }

    /*  Function: hideMessageDialog
     *   Description: Hides the message dialog
     */
    function hideMessageDialog() {
        setShowMessageDialog(false);
    }

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
                addItemBtnAction={() => toggleFormModal('tool', true)}
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
                                setError={showErrorDialog}
                                setNotification={showNotification}
                            />
                        ))}
                    </>
                )}
            </CardsList>

            <CardsList
                title="Materiales"
                addItemBtnText="Agregar material"
                addItemBtnAction={() => toggleFormModal('material', true)}
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
                                setError={showErrorDialog}
                                setNotification={showNotification}
                            />
                        ))}
                    </>
                )}
            </CardsList>
            {showMessageDialog && (
                <MessageDialog
                    onClose={hideMessageDialog}
                    type={messageType}
                    title={messageTitle}
                    text={notification}
                />
            )}
            {showToolForm && (
                <ToolForm
                    exitAction={() => toggleFormModal('tool', false)}
                    create={true}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
            {showMaterialForm && (
                <MaterialForm
                    exitAction={() => toggleFormModal('material', false)}
                    create={true}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
        </>
    );
}
