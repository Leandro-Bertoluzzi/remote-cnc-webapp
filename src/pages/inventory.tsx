import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import Material from '../types/Material';
import MaterialCard from '../components/cards/materialCard';
import MaterialForm from '../components/forms/materialForm';
import Tool from '../types/Tool';
import ToolCard from '../components/cards/toolCard';
import ToolForm from '../components/forms/toolForm';

const EMPTY_TOOL: Tool = {
    id: 0,
    name: "",
    description: ""
};

const EMPTY_MATERIAL: Material = {
    id: 0,
    name: "",
    description: ""
};

export default function ToolsView() {
    // Hooks for state variables (tools)
    const [tools, setTools] = useState<Tool[]>([]);
    const [showToolForm, setShowToolForm] = useState<boolean>(false);
    const [toolToUpdate, setToolToUpdate] = useState<Tool>(EMPTY_TOOL);

    // Hooks for state variables (materials)
    const [materials, setMaterials] = useState<Material[]>([]);
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);
    const [materialToUpdate, setMaterialToUpdate] = useState<Material>(EMPTY_MATERIAL);

    // Hooks for state variables (other)
    const [isCreate, setIsCreate] = useState<boolean>(false);

    /*  Function: showCreateToolFormModal
    *   Description: Enables the modal to upload a new tool
    */
    function  showCreateToolFormModal() {
        setIsCreate(true);
        setToolToUpdate(EMPTY_TOOL);
        setShowToolForm(true);
    }

    /*  Function: showUpdateToolFormModal
    *   Description: Enables the modal to update an existing tool
    */
    function showUpdateToolFormModal(tool: Tool) {
        setIsCreate(false);
        setToolToUpdate(tool);
        setShowToolForm(true);
    }

    /*  Function: hideToolFormModal
    *   Description: Disables the modal to upload a new tool or update an existing one
    */
    function hideToolFormModal() {
        setShowToolForm(false);
    }
    /*  Function: showCreateMaterialFormModal
    *   Description: Enables the modal to upload a new material
    */
    function  showCreateMaterialFormModal() {
        setIsCreate(true);
        setMaterialToUpdate(EMPTY_MATERIAL);
        setShowMaterialForm(true);
    }

    /*  Function: showUpdateMaterialFormModal
    *   Description: Enables the modal to update an existing material
    */
    function showUpdateMaterialFormModal(material: Material) {
        setIsCreate(false);
        setMaterialToUpdate(material);
        setShowMaterialForm(true);
    }

    /*  Function: hideMaterialFormModal
    *   Description: Disables the modal to upload a new material or update an existing one
    */
    function hideMaterialFormModal() {
        setShowMaterialForm(false);
    }

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest('tools', 'GET')
            .then(data => {
                setTools(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });

        apiRequest('materials', 'GET')
            .then(data => {
                setMaterials(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });
    }, []);

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
                            {
                                tools.map((tool) => (
                                    <ToolCard
                                        key={tool.id}
                                        tool={tool}
                                        updateAction={showUpdateToolFormModal}
                                    />
                                ))
                            }
                        </>
                    )
                }
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
                            {
                                materials.map((material) => (
                                    <MaterialCard
                                        key={material.id}
                                        material={material}
                                        updateAction={showUpdateMaterialFormModal}
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showToolForm &&
                <ToolForm exitAction={hideToolFormModal} create={isCreate} toolInfo={toolToUpdate} />
            }
            {showMaterialForm &&
                <MaterialForm exitAction={hideMaterialFormModal} create={isCreate} materialInfo={materialToUpdate} />
            }
        </>
    )
}
