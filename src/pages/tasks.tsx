import TaskCard from '../components/taskCard';
import CardsList from '../components/cardsList';

const tasks = [
    {
      id: 1,
      name: 'An example project 1',
      material: 'wood',
      file: 'archivo1.gcode',
      notes: 'Additional instructions for admin',
    },
    {
      id: 2,
      name: 'An example project 2',
      material: 'aluminum',
      file: 'archivo2.gcode',
      notes: 'Additional instructions for admin',
    },
    {
      id: 3,
      name: 'An example project 3',
      material: 'cardboard',
      file: 'archivo1-20230502-190205.gcode',
      notes: 'Additional instructions for admin',
    },
    {
      id: 4,
      name: 'An example project 4',
      material: 'PLA',
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
                "There are no tasks"
            </div>
            }
        </CardsList>
    )
  }