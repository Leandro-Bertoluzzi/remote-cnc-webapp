import TaskCard from '../components/taskCard';
import CardsList from '../components/cardsList';
import Task from '../types/Task';

const tasks: Task[] = [
    {
      id: 1,
      name: 'An example project 1',
      material: 'wood',
      tool: 'Mecha 5mm',
      file: 'archivo1.gcode',
      notes: 'Additional instructions for admin',
    },
    {
      id: 2,
      name: 'An example project 2',
      material: 'aluminum',
      tool: 'Mecha 5mm',
      file: 'archivo2.gcode',
      notes: 'Additional instructions for admin',
    },
    {
      id: 3,
      name: 'An example project 3',
      material: 'cardboard',
      tool: 'Láser 1W',
      file: 'archivo1-20230502-190205.gcode',
      notes: 'Additional instructions for admin',
    },
    {
      id: 4,
      name: 'An example project 4',
      material: 'PLA',
      tool: 'Extrusor de filamento',
      file: 'example.txt',
      notes: 'Additional instructions for admin',
    },
  ]

export default function TasksView() {
    return (
        <CardsList title="Tareas">
            <div className="flex flex-wrap -m-3">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
            {tasks.length === 0 &&
            <div className="flex flex-wrap -m-3">
                There are no tasks
            </div>
            }
        </CardsList>
    )
  }