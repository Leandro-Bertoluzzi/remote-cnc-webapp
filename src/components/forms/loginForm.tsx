import { Button, TextInput } from "flowbite-react";
import LoginFormProps from "@/types/LoginFormProps";
import React, { FormEvent, ChangeEvent, useState } from "react";

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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        btnSubmitAction(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto mb-5 flex max-w-md flex-col">
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
