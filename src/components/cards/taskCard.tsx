import { useState } from 'react';
import { BUTTON_CANCEL, BUTTON_EDIT } from '../cardButton';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import CancelTaskForm from '../forms/cancelTaskForm';
import TaskCardProps from '../../types/TaskCardProps';
import TaskForm from '../forms/taskForm';

export default function TaskCard(props: TaskCardProps) {
    // Props
    const {
        task,
        show,
        toolsList,
        materialsList,
        filesList,
        setError
    } = props;

    // Hooks for state variables
    const [showUpdateTaskForm, setShowUpdateTaskForm] = useState<boolean>(false);
    const [showCancelTaskForm, setShowCancelTaskForm] = useState<boolean>(false);

    // Text
    const materialText = `Material: ${materialsList.find(material => material.id == task.material_id)?.name}`;
    const toolText = `Tool: ${toolsList.find(tool => tool.id == task.tool_id)?.name}`;
    const fileText = `File: ${filesList.find(file => file.id == task.file_id)?.file_name}`;
    const additionalText = [materialText, toolText, fileText];

    if(task.note){
        additionalText.push(task.note)
    }
    if(task.status === 'on_hold' || task.status === 'in_progress' || task.status === 'finished'){
        additionalText.push(`Approved by ${task.admin_id}`)
    }
    if(task.status === 'rejected'){
        additionalText.push(`Rejected by ${task.admin_id}`)
    }
    if(task.status === 'cancelled'){
        additionalText.push(`Cancellation reason: ${task.cancellation_reason}`)
    }

    /*  Function: showUpdateTaskFormModal
    *   Description: Enables the modal to update the current task
    */
    function showUpdateTaskFormModal() {
        setShowUpdateTaskForm(true);
    }

    /*  Function: hideUpdateTaskFormModal
    *   Description: Disables the modal to update the current task
    */
    function hideUpdateTaskFormModal() {
        setShowUpdateTaskForm(false);
    }

    /*  Function: showCancelTaskFormModal
    *   Description: Enables the modal to cancel the current task
    */
    function showCancelTaskFormModal() {
        setShowCancelTaskForm(true);
    }

    /*  Function: hideCancelFormModal
    *   Description: Disables the modal to cancel the current task
    */
    function hideCancelFormModal() {
        setShowCancelTaskForm(false);
    }

    // Buttons
    const btnEdit: ButtonInfo = {
        type: BUTTON_EDIT,
        action: showUpdateTaskFormModal
    }
    const btnCancel: ButtonInfo = {
        type: BUTTON_CANCEL,
        action: showCancelTaskFormModal
    }

    if (!show) {
        return <></>;
    }

    return (
        <>
            <BaseCard
                mainText={task.name}
                additionalText={additionalText}
                buttons={[btnEdit, btnCancel]}
            />
            {showUpdateTaskForm &&
                <TaskForm
                    exitAction={hideUpdateTaskFormModal}
                    create={false}
                    taskInfo={task}
                    toolsList={toolsList}
                    materialsList={materialsList}
                    filesList={filesList}
                    setError={setError}
                />
            }
            {showCancelTaskForm &&
                <CancelTaskForm
                    exitAction={hideCancelFormModal}
                    taskInfo={task}
                    setError={setError}
                />
            }
        </>
    )
}
