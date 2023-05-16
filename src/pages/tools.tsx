import { useState, useEffect } from 'react';
import ToolCard from '../components/toolCard';
import CardsList from '../components/cardsList';
import Tool from '../types/Tool';
import EmptyCard from '../components/emptyCard';
import config from '../config';

export default function ToolsView() {
    // Hooks for state variables
    const [tools, setTools] = useState<Tool[]>([]);
    const { API_PORT, API_HOST } = config;

    /*  Function: updateTools
    *   Description: Initializes the array of tools to display
    */
    function updateTools() {
        const apiBaseUrl = `http://${API_HOST}:${API_PORT}`;

        fetch(`${apiBaseUrl}/tools`)
            .then((res) => res.json())
            .then(data => {
                setTools(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });
    }

    // Action to execute at the beginning
    useEffect(() => updateTools(), []);

    return (
        <CardsList title="Herramientas">
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
