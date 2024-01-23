import LoginFormProps from "../../types/LoginFormProps";
import { ChangeEvent, useState } from "react";

export default function LoginForm(props: LoginFormProps) {
    // Props
    const { btnSubmitAction } = props;

    // Hooks for state variables
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleUploadClick = () => {
        btnSubmitAction(email, password);
    };

    return (
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
    );
}
