import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/cards/emptyCard';
import Material from '../types/Material';
import MaterialCard from '../components/cards/materialCard';
import Tool from '../types/Tool';
import ToolCard from '../components/cards/toolCard';

export default function ToolsView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);

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
            <CardsList title="Herramientas" addItemBtnText="Agregar herramienta" showAddItemBtn>
                {tools.length === 0 ? (
                    <EmptyCard itemName="herramientas configuradas" />
                ) : (
                        <>
                            {
                                tools.map((tool) => (
                                    <ToolCard key={tool.id} tool={tool} />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>

            <CardsList title="Materiales" addItemBtnText="Agregar material" showAddItemBtn>
                {materials.length === 0 ? (
                    <EmptyCard itemName="materiales guardados" />
                ) : (
                        <>
                            {
                                materials.map((material) => (
                                    <MaterialCard key={material.id} material={material} />
                                ))
                            }
                        </>
                    )
                }
            </CardsList>
        </>
    )
}
