import ToolCard from '../components/toolCard';
import CardsList from '../components/cardsList';
import Tool from '../types/Tool';

const tools: Tool[] = [
    {
      id: 1,
      name: 'Mecha 5mm',
      description: 'Mecha de taladro de 5 [mm] de acero rápido',
    },
    {
      id: 2,
      name: 'Fresa para ranurar',
      description: 'Fresa para ranurar',
    },
    {
      id: 3,
      name: 'Láser 1W',
      description: 'Láser de 1W para grabado de madera/plástico y corte de láminas delgadas',
    },
    {
      id: 4,
      name: 'Extrusor de filamento',
      description: 'Extrusor de filamento para impresiones 3D',
    },
  ]

export default function ToolsView() {
    return (
        <CardsList title="Herramientas">
            <div className="flex flex-wrap -m-3">
                {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool}/>
                ))}
            </div>
            {tools.length === 0 &&
            <div className="flex flex-wrap -m-3">
                There are no tools
            </div>
            }
        </CardsList>
    )
  }