"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import apiRequest from "@/services/apiService";
import MessageDialog from "@/components/dialogs/messageDialog";
import { setJwtToken } from "@/services/storage";
import LoginForm from "@/components/forms/loginForm";

export default function Login() {
    // Hooks for state variables
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");

    // Additional variables
    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl as string) ?? "/";

    const handleUploadClick = (email: string, password: string) => {
        const data = {
            email: email,
            password: password,
        };

        apiRequest("users/login", "POST", data, true)
            .then((response) => {
                setJwtToken(response.data.token);
                router.push(callbackUrl);
            })
            .catch((error) => {
                showErrorDialog(error.message);
            });
    };

    /*  Function: showErrorDialog
     *   Description: Shows a dialog with information about the error
     */
    function showErrorDialog(message: string) {
        setNotification(message);
        setShowMessageDialog(true);
    }

    /*  Function: hideErrorDialog
     *   Description: Hides the dialog with information about the error
     */
    function hideErrorDialog() {
        setShowMessageDialog(false);
    }

    return (
        <>
            <section className="bg-gradient-gray2 relative overflow-hidden">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="w-full p-6">
                            <div className="mx-auto text-center md:max-w-xl">
                                <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-7xl">
                                    Identificación de usuario
                                </h2>
                                <p className="mb-11 text-lg text-gray-500">¡Bienvenido!</p>
                                <LoginForm btnSubmitAction={handleUploadClick} />
                                <p className="text-base text-gray-600">
                                    <span>¿No tiene cuenta? </span>
                                    <a className="text-blue-900 hover:text-blue-400" href="#">
                                        Contáctenos
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showMessageDialog && (
                <MessageDialog
                    onClose={hideErrorDialog}
                    type="error"
                    title="Error de API"
                    text={notification}
                />
            )}
        </>
    );
}
