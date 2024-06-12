import apiRequest from "@/services/apiService";
import { Button, Dropdown } from "flowbite-react";
import { TbPlug, TbPlugX } from "react-icons/tb";
import { useState } from "react";

export default function PortsList() {
    const [connected, setConnected] = useState<boolean>(false);
    const [selectedPort, setSelectedPort] = useState<string>("");

    const ports = ["/dev/ttyUSB0", "/dev/example", "/dev/invalid"];

    // Handlers
    const handleSelectPort = (port: string) => {
        setSelectedPort(port);
    };

    const handleConnect = () => {
        if (connected) {
            apiRequest("cnc/server", "DELETE")
                .then(() => setConnected(false))
                .catch((error) => console.log("Hubo un error: ", error.message));
            return;
        }

        apiRequest("cnc/server", "POST")
            .then(() => setConnected(true))
            .catch((error) => console.log("Hubo un error: ", error.message));
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <Dropdown label={selectedPort || "elegir puerto"} color="teal" size="sm">
                {ports.map((port) => (
                    <Dropdown.Item key={port} onClick={() => handleSelectPort(port)}>
                        {port}
                    </Dropdown.Item>
                ))}
            </Dropdown>
            <Button
                color={connected ? "failure" : "success"}
                disabled={!selectedPort}
                onClick={() => handleConnect()}
                size="md"
            >
                {connected ? <TbPlugX /> : <TbPlug />}
            </Button>
        </div>
    );
}
