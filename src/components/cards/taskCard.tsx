import { useState } from 'react';
import { BUTTON_CANCEL, BUTTON_EDIT } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import TaskCardProps from '../../types/TaskCardProps';
import TaskForm from '../forms/taskForm';

export default function TaskCard(props: TaskCardProps) {
    // Props
    const {
        task,
        show,
        toolsList,
        materialsList,
        filesList
    } = props;

    // Hooks for state variables
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

    // Text
    const materialText = `Material: ${task.material}`;
    const toolText = `Tool: ${task.tool}`;
    const fileText = `File: ${task.file}`;
    const approvalNote = task.status === 'on_hold' || task.status === 'in_progress' || task.status === 'finished'
        ? `Approved by ${task.admin}`
        : (
            task.status === 'rejected'
            ? `Rejected by ${task.admin}`
            : ''
        );

    /*  Function: showUpdateTaskFormModal
    *   Description: Enables the modal to update the current task
    */
    function showUpdateTaskFormModal() {
        setShowTaskForm(true);
    }

    /*  Function: hideTaskFormModal
    *   Description: Disables the modal to update the current task
    */
    function hideTaskFormModal() {
        setShowTaskForm(false);
    }

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateTaskFormModal
    }
    const btnCancel: ButtonInfo = {
        type: BUTTON_CANCEL,
        action: () => { }
    }

    if (!show) {
        return <></>;
    }

    return (
        <>
            <BaseCard
                mainText={task.name}
                additionalText={[materialText, toolText, fileText, task.note, approvalNote]}
                buttons={[btnEdit, btnCancel]}
            />
            {showTaskForm &&
                <TaskForm
                    exitAction={hideTaskFormModal}
                    create={false}
                    taskInfo={task}
                    toolsList={toolsList}
                    materialsList={materialsList}
                    filesList={filesList}
                />
            }
        </>
    )
}
