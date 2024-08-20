import apiRequest from "@/services/apiService";
import { Button, TextInput } from "flowbite-react";
import React, { FormEvent, ChangeEvent, useState } from "react";
import { setJwtToken } from "@/services/storage";
import { useRouter, useSearchParams } from "next/navigation";

export interface LoginFormProps {
    onErrorAction: (message: string) => void;
}

export default function LoginForm(props: LoginFormProps) {
    // Props
    const { onErrorAction } = props;

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
        const data = {
            email,
            password,
        };

        apiRequest("users/login", "POST", data, true)
            .then((response) => {
                const callbackUrl = searchParams.get("callbackUrl") ?? "/";
                setJwtToken(response.data.token);
                router.push(callbackUrl);
            })
            .catch((error) => {
                onErrorAction(error.message);
            });
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
