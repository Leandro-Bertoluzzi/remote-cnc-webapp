import { Button, TextInput } from "flowbite-react";
import React, { FormEvent, ChangeEvent, useState } from "react";
import { useNotification } from "@/contexts/notificationContext";
import { useAppClients } from "@/contexts/appClientsContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
    // Context
    const { showErrorDialog } = useNotification();
    const { authClient, sessionStorageClient } = useAppClients();

    // Hooks for state variables
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Navigation hooks
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        authClient
            .login(email, password)
            .then((response) => {
                const callbackUrlParam = searchParams.get("callbackUrl");
                const callbackUrl =
                    typeof callbackUrlParam === "string" && callbackUrlParam.trim().length > 0
                        ? callbackUrlParam
                        : "/";
                sessionStorageClient.setToken(response.token);
                router.push(callbackUrl);
            })
            .catch((error) => showErrorDialog(error.message));
    };

    return (
        <form
            data-testid="login-form"
            onSubmit={handleLogin}
            className="mx-auto mb-5 flex max-w-md flex-col"
        >
            <TextInput
                className="my-2"
                onChange={handleEmailChange}
                id="email2"
                type="email"
                placeholder="name@email.com"
                name="email"
                required
                shadow
            />
            <TextInput
                className="my-2"
                onChange={handlePasswordChange}
                id="password2"
                data-testid="input-password"
                type="password"
                name="password"
                required
                shadow
            />
            <Button type="submit" className="my-2 w-full bg-sky-400 p-2 hover:bg-sky-600">
                Enviar
            </Button>
        </form>
    );
}
