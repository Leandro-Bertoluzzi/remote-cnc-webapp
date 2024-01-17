import { useState } from 'react';
import { BUTTON_APPROVE, BUTTON_REJECT } from '../cards/baseCard';
import apiRequest from '../../services/apiService';
import ButtonInfo from '../../types/ButtonInfo';
import BaseCard from './baseCard';
import ConfirmDialog from '../dialogs/confirmDialog';
import RequestCardProps from '../../types/RequestCardProps';

const APPROVED_STATUS = 'on_hold';
const REJECTED_STATUS = 'rejected';

export default function RequestCard(props: RequestCardProps) {
    const { task, setError, setNotification } = props;
    const [showApproveConfirmation, setShowApproveConfirmation] = useState<boolean>(false);
    const [showRejectConfirmation, setShowRejectConfirmation] = useState<boolean>(false);

    // Text
    const materialText = `Material: ${task.material_id}`;
    const toolText = `Tool: ${task.tool_id}`;
    const fileText = `File: ${task.file_id}`;

    /*  Function: approveRequest
    *   Description: Approves the current request
    */
    const approveRequest = () => {
        hideApproveConfirmationModal()

        const data = {
            'status': APPROVED_STATUS
        }
        const url = `tasks/${task.id}/status`;

        apiRequest(url, 'PUT', data, true)
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: rejectRequest
    *   Description: Rejects the current request
    */
    const rejectRequest = () => {
        hideRejectConfirmationModal()

        const data = {
            'status': REJECTED_STATUS
        }
        const url = `tasks/${task.id}/status`;

        apiRequest(url, 'PUT', data, true)
            .then((response) => {
                setNotification(response.success);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    /*  Function: showRemoveConfirmationModal
    *   Description: Enables the modal to confirm the approval
    */
    function showRemoveConfirmationModal() {
        setShowApproveConfirmation(true);
    }

    /*  Function: hideApproveConfirmationModal
    *   Description: Disables the modal to confirm the approval
    */
    function hideApproveConfirmationModal() {
        setShowApproveConfirmation(false);
    }

    /*  Function: showRejectConfirmationModal
    *   Description: Enables the modal to confirm the approval
    */
    function showRejectConfirmationModal() {
        setShowRejectConfirmation(true);
    }

    /*  Function: hideApproveConfirmationModal
    *   Description: Disables the modal to confirm the approval
    */
    function hideRejectConfirmationModal() {
        setShowRejectConfirmation(false);
    }

    // Buttons
    const btnApprove: ButtonInfo = {
        type: BUTTON_APPROVE,
        action: showRemoveConfirmationModal
    }
    const btnReject: ButtonInfo = {
        type: BUTTON_REJECT,
        action: showRejectConfirmationModal
    }

    return (
        <>
            <BaseCard
                mainText={task.name}
                additionalText={[materialText, toolText, fileText, task.note]}
                buttons={[btnApprove, btnReject]}
            />
            {showApproveConfirmation &&
                <ConfirmDialog
                    title="Aprobar solicitud"
                    text="¿Está seguro de que desea aprobar la solicitud?"
                    confirmText="Aprobar"
                    onAccept={approveRequest}
                    onCancel={hideApproveConfirmationModal}
                />
            }
            {showRejectConfirmation &&
                <ConfirmDialog
                    title="Rechazar solicitud"
                    text="¿Está seguro de que desea rechazar la solicitud?"
                    confirmText="Rechazar"
                    onAccept={rejectRequest}
                    onCancel={hideRejectConfirmationModal}
                />
            }
        </>
    )
}
