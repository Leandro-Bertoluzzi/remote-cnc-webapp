import { ChangeEvent, useState } from 'react';
import apiRequest from '../../services/apiService';
import BaseForm from './baseForm';
import UserFormProps from '../../types/UserFormProps';

export default function UserForm(props: UserFormProps) {
    // Props
    const { exitAction, create, userInfo } = props;

    // Hooks for state variables
    const [userName, setUserName] = useState<string>(userInfo.name);
    const [userEmail, setUserEmail] = useState<string>(userInfo.email);
    const [userRole, setUserRole] = useState<string>(userInfo.role);

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setUserName(e.target.value);
        }
    };

    const handleUserEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setUserEmail(e.target.value);
        }
    };

    const handleUserRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setUserRole(e.target.value);
        }
    };

    const handleUploadClick = () => {
        const data = {
            "name": userName,
            "email": userEmail,
            "role": userRole
        }

        apiRequest('users', 'POST', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            "name": userName,
            "email": userEmail,
            "role": userRole
        }
        const url = `users/${userInfo.id}`;

        apiRequest(url, 'PUT', data, true)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        exitAction();
    };

    return (
        <BaseForm
            title={create ? "Nuevo usuario" : "Editar usuario"}
            subtitle=""
            exitAction={exitAction}
            btnSubmitAction={create ? handleUploadClick : handleUpdateClick}
            btnSubmitText={create ? "Crear" : "Actualizar"}
        >
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="user-name-input">Nombre: </label>
                <input id="user-name-input" type="text" onChange={handleUserNameChange} value={userName} />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="user-email-input">Correo electrónico: </label>
                <input id="user-email-input" type="text" onChange={handleUserEmailChange} value={userEmail} />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <label className="font-medium" htmlFor="user-role-input">Rol: </label>
                <select
                    id="user-role-input"
                    value={userRole}
                    onChange={handleUserRoleChange}
                >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </div>
        </BaseForm>
    )
}

UserForm.defaultProps = {
    userInfo: {
        id: 0,
        name: "",
        email: "",
        role: "user"
    }
}
