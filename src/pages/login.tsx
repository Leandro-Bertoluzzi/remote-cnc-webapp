import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import apiRequest from "../services/apiService";
import MessageDialog from "@/components/dialogs/messageDialog";
import { setJwtToken } from "../services/storage";

export default function Login() {
    // Hooks for state variables
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showMessageDialog, setShowMessageDialog] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");

    // Additional variables
    const router = useRouter();
    const callbackUrl = (router.query?.callbackUrl as string) ?? "/";

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleUploadClick = () => {
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
                                <h2 className="font-heading mb-4 text-6xl font-bold text-gray-900 sm:text-7xl">
                                    Identificación de usuario
                                </h2>
                                <p className="mb-11 text-lg text-gray-500">¡Bienvenido!</p>
                                <div className="mx-auto mb-5 flex max-w-md flex-wrap">
                                    <div className="w-full p-2">
                                        <input
                                            onChange={handleEmailChange}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-5 py-3.5 text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-indigo-500"
                                            type="text"
                                            placeholder="Email address"
                                            name="email"
                                        />
                                    </div>
                                    <div className="w-full p-2">
                                        <input
                                            onChange={handlePasswordChange}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-5 py-3.5 text-gray-500 placeholder-gray-500 outline-none focus:ring-4 focus:ring-indigo-500"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                        />
                                    </div>
                                    <div className="w-full p-2">
                                        <div className="group relative">
                                            <div className="absolute left-0 top-0 h-full w-full rounded-lg transition duration-300 ease-out group-hover:opacity-50"></div>
                                            <button
                                                onClick={handleUploadClick}
                                                className="font-heading w-full overflow-hidden rounded-md p-1 text-base font-medium text-white"
                                            >
                                                <div className="relative overflow-hidden rounded-md bg-sky-400 px-9 py-4">
                                                    <div className="absolute left-0 top-0 h-full w-full -translate-y-full transform bg-gray-900 transition duration-500 ease-in-out group-hover:-translate-y-0"></div>
                                                    <p className="relative z-10">Enviar</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-base text-gray-600">
                                    <span>¿No tiene cuenta?</span>
                                    <a className="text-blue-900 hover:text-blue-400" href="#">
                                        {" "}
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
