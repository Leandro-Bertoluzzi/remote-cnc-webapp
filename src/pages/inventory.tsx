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

export default function ToolsView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const [showToolForm, setShowToolForm] = useState<boolean>(false);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [showMaterialForm, setShowMaterialForm] = useState<boolean>(false);

    /*  Function: showCreateToolFormModal
    *   Description: Enables the modal to upload a new tool
    */
    function  showCreateToolFormModal() {
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
    function  showCreateMaterialFormModal() {
        setShowMaterialForm(true);
    }

    /*  Function: hideMaterialFormModal
    *   Description: Disables the modal to upload a new material
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
                                    />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
            {showToolForm &&
                <ToolForm exitAction={hideToolFormModal} create={true} />
            }
            {showMaterialForm &&
                <MaterialForm exitAction={hideMaterialFormModal} create={true} />
            }
        </>
    )
}
