import { getEventSource } from "@/services/apiService";
import GrblMessage from "@/types/GrblMessage";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import TerminalProps from "@/types/TerminalProps";
import { TextInput, Button } from "flowbite-react";
import { useState, useEffect } from "react";

export default function Terminal(props: TerminalProps) {
    const { sender } = props;

    // State
    const [messages, setMessages] = useState<string[]>([]);
    const [text, setText] = useState<string>("");

    // State hooks
    useEffect(() => {
        const es = getEventSource("grbl_messages");

        es.onopen = () => console.log(">>> Connection opened!");
        es.onerror = (e) => console.log("ERROR!", e);

        es.addEventListener("grbl_messages", (event) => {
            if (event.data) {
                updateMessages(JSON.parse(event.data));
            }
        });

        return () => es.close();
    }, []);

    // Actions
    const updateMessages = (data: GrblMessage) => {
        setMessages(oldMessages => [...oldMessages, data.message]);
    };

    const sendCommand = () => {
        // Send "text"
        console.log(text);
        setText("");
        return;
    };

    // Render
    return (
        <div className="flex md:aspect-video max-h-[60vh] md:max-h-full flex-col overflow-x-auto rounded-lg bg-black">
            <div className="m-4 grow overflow-y-scroll text-sm text-lime-600">
                {messages.length === 0 && <div>Esperando mensajes...</div>}
                {messages.map((message, key) => (
                    <div key={key}>{`> ${message}`}</div>
                ))}
            </div>
            {sender && (
                <div className="relative">
                    <TextInput
                        placeholder="A command..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Button className="absolute right-1 top-1 z-10 h-8" onClick={sendCommand}>
                        <PaperAirplaneIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </Button>
                </div>
            )}
        </div>
    );
}
