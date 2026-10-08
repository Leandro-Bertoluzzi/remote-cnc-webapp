import GrblMessage from "@/types/GrblMessage";
import { VscSend } from "react-icons/vsc";
import { TextInput, Button } from "flowbite-react";
import { useAppClients } from "@/contexts/appClientsContext";
import { useConnection } from "@/contexts/connectionContext";
import { useState, useEffect, useRef, useCallback } from "react";

export interface TerminalProps {
    sender?: boolean;
}

export default function Terminal(props: TerminalProps) {
    const { sender } = props;

    // Referencies
    const messagesContainer = useRef<HTMLDivElement>(null);

    // State
    const [messages, setMessages] = useState<string[]>([]);
    const [text, setText] = useState<string>("");

    // Context
    const { connected } = useConnection();
    const { controllerClient } = useAppClients();

    // Actions
    const updateMessages = useCallback((data: GrblMessage) => {
        setMessages((oldMessages) => [...oldMessages, data.message]);

        // Scroll terminal up to last added element
        messagesContainer.current?.scrollTo(0, messagesContainer.current?.scrollHeight);
    }, []);

    // State hooks
    useEffect(() => {
        return controllerClient.subscribeMessages("grbl_messages", updateMessages);
    }, [controllerClient, updateMessages]);

    /*  Function: sendCommand
     *   Description: Requests the API to execute the command
     */
    const sendCommand = () => {
        controllerClient
            .sendCommand(text)
            .then((response) => console.log("SUCCESS: ", response))
            .catch((error) => console.log("ERROR: ", error));
        setText("");
    };

    // Render
    return (
        <div className="flex max-h-[60vh] flex-col overflow-x-auto rounded-lg bg-black md:aspect-video md:max-h-full">
            <div
                ref={messagesContainer}
                className="m-4 grow overflow-y-scroll text-sm text-lime-600"
            >
                {messages.length === 0 && <div>Esperando mensajes...</div>}
                {messages.map((message, index) => (
                    <div key={index}>{`> ${message}`}</div>
                ))}
            </div>
            {sender && connected && (
                <div className="relative">
                    <TextInput
                        placeholder="A command..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendCommand();
                        }}
                    />
                    <Button className="absolute right-1 top-1 z-10 h-8" onClick={sendCommand}>
                        <VscSend className="h-6 w-6 text-white" aria-hidden="true" />
                    </Button>
                </div>
            )}
        </div>
    );
}
