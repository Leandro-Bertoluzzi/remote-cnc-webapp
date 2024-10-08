import { useState } from "react";
import apiRequest from "@/services/apiService";
import BaseForm from "./baseForm";
import User from "@/types/User";
import LabeledTextInput from "../discrete/labeledTextInput";
import LabeledSelect from "../discrete/labeledSelect";
import { useNotification } from "@/contexts/notificationContext";
import { useItems } from "@/contexts/itemsContext";

export interface UserFormProps {
    exitAction: () => void;
    create: boolean;
    userInfo?: User;
}

const defaultUserInfo = {
    id: 0,
    name: "",
    email: "",
    role: "user",
};

export default function UserForm(props: UserFormProps) {
    // Props
    const { exitAction, create, userInfo = defaultUserInfo } = props;

    // Context
    const { showErrorDialog, showNotification } = useNotification();
    const { fetchUsers } = useItems();

    // Hooks for state variables
    const [userName, setUserName] = useState<string>(userInfo.name);
    const [userEmail, setUserEmail] = useState<string>(userInfo.email);
    const [userPassword, setUserPassword] = useState<string>(userInfo.email);
    const [userRole, setUserRole] = useState<string>(userInfo.role);

    const handleUserNameChange = (name: string) => {
        setUserName(name);
    };

    const handleUserEmailChange = (email: string) => {
        setUserEmail(email);
    };

    const handleUserPasswordChange = (password: string) => {
        setUserPassword(password);
    };

    const handleUserRoleChange = (role: string) => {
        setUserRole(role);
    };

    const handleUploadClick = () => {
        const data = {
            name: userName,
            email: userEmail,
            password: userPassword,
            role: userRole,
        };

        apiRequest("users", "POST", data, true)
            .then((response) => {
                showNotification(response.success);
                fetchUsers();
            })
            .catch((err) => showErrorDialog(err.message));

        exitAction();
    };

    const handleUpdateClick = () => {
        const data = {
            name: userName,
            email: userEmail,
            role: userRole,
        };
        const url = `users/${userInfo.id}`;

        apiRequest(url, "PUT", data, true)
            .then((response) => {
                showNotification(response.success);
                fetchUsers();
            })
            .catch((err) => showErrorDialog(err.message));

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
                <LabeledTextInput
                    label="Nombre"
                    name="user-name"
                    placeholder=""
                    value={userName}
                    handleChange={handleUserNameChange}
                />
            </div>
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledTextInput
                    label="Correo electrónico"
                    name="user-email"
                    type="email"
                    placeholder=""
                    value={userEmail}
                    handleChange={handleUserEmailChange}
                />
            </div>
            {create && (
                <div className="mb-5 w-full overflow-x-auto">
                    <LabeledTextInput
                        label="Contraseña"
                        name="user-password"
                        type="password"
                        placeholder=""
                        value={userPassword}
                        handleChange={handleUserPasswordChange}
                    />
                </div>
            )}
            <div className="mb-5 w-full overflow-x-auto">
                <LabeledSelect
                    label="Rol de usuario"
                    name="user-role"
                    initialValue={userRole}
                    handleChange={handleUserRoleChange}
                    options={[
                        { label: "user", value: "user" },
                        { label: "admin", value: "admin" },
                    ]}
                />
            </div>
        </BaseForm>
    );
}
