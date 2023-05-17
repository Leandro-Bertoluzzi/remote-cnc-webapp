import { useState, useEffect } from 'react';
import apiRequest from '../services/apiService';
import CardsList from '../components/cardsList';
import EmptyCard from '../components/emptyCard';
import Tool from '../types/Tool';
import ToolCard from '../components/toolCard';

export default function ToolsView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);

    // Action to execute at the beginning
    useEffect(() => {
        apiRequest('tools', 'GET')
        .then(data => {
            setTools(data);
        })
        .catch(error => {
            console.log("Connection error: ", error.message);
        });
    }, []);

    return (
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
    )
}
