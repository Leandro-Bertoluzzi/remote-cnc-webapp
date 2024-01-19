import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import apiRequest from "../services/apiService";
import { getJwtToken } from "../services/storage";
import CardsList from "../components/containers/cardsList";
import EmptyCard from "../components/cards/emptyCard";
import Material from "../types/Material";
import MaterialCard from "../components/cards/materialCard";
import MaterialForm from "../components/forms/materialForm";
import MessageDialog from "@/components/dialogs/messageDialog";
import { MessageDialogType } from "@/types/MessageDialogProps";
import Tool from "../types/Tool";
import ToolCard from "../components/cards/toolCard";
import ToolForm from "../components/forms/toolForm";

export default function InventoryView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const [showToolForm, setShowToolForm] = useState<boolean>(false);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");
    const [messageType, setMessageType] = useState<MessageDialogType>("error");
    const [messageTitle, setMessageTitle] = useState<string>("");

    // Other hooks
    const router = useRouter();

    // Action to execute at the beginning
    useEffect(() => {
        const callbackUrl = "inventory";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
            return;
        }

        apiRequest("users/auth", "GET")
            .then(() => {
                setIsValidated(true);
            })
            .catch(() => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /*  Function: showCreateToolFormModal
     *   Description: Enables the modal to upload a new tool
     */
    function showCreateToolFormModal() {
        setShowToolForm(true);
    }

    /*  Function: hideToolFormModal
     *   Description: Disables the modal to upload a new tool
     */
    function hideToolFormModal() {
        setShowToolForm(false);
    }

    /*  Function: showCreateMaterialFormModal
     *   Description: Enables the modal to upload a new material
     */
    function showCreateMaterialFormModal() {
        setShowMaterialForm(true);
    }

    /*  Function: hideMaterialFormModal
     *   Description: Disables the modal to upload a new material
     */
    function hideMaterialFormModal() {
        setShowMaterialForm(false);
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

        if (isValidated) {
            queryItems();
        }
    }, [isValidated]);

    return (
        <>
            <CardsList
                title="Herramientas"
                addItemBtnText="Agregar herramienta"
                addItemBtnAction={showCreateToolFormModal}
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
                addItemBtnAction={showCreateMaterialFormModal}
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
                    exitAction={hideToolFormModal}
                    create={true}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
            {showMaterialForm && (
                <MaterialForm
                    exitAction={hideMaterialFormModal}
                    create={true}
                    setError={showErrorDialog}
                    setNotification={showNotification}
                />
            )}
        </>
    );
}
