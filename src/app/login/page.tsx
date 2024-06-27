"use client";

import { Suspense, useState } from "react";
import MessageDialog from "@/components/dialogs/messageDialog";
import LoginForm from "@/components/forms/loginForm";
import { Skeleton } from "@/components/discrete/skeleton";

export default function Login() {
    // Hooks for state variables
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");

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
                                <Suspense fallback={<Skeleton />}>
                                    <LoginForm onErrorAction={showErrorDialog} />
                                </Suspense>
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
