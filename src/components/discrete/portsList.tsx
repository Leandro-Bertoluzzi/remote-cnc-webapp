import apiRequest from "@/services/apiService";
import { Button, Dropdown } from "flowbite-react";
import { TbPlug, TbPlugX } from "react-icons/tb";
import { useConnection } from "@/contexts/connectionContext";
import { useNotification } from "@/contexts/notificationContext";
import { useEffect, useState } from "react";
import { useWorkerStatus } from "@/contexts/workerContext";

export default function PortsList() {
    const [waiting, setWaiting] = useState<boolean>(false);
    const [selectedPort, setSelectedPort] = useState<string>("");

    // Context
    const { showErrorDialog } = useNotification();
    const { workerStatus } = useWorkerStatus();
    const { connected, updateConnected } = useConnection();

    // Calculated values
    const ports = ["/dev/ttyUSB0", "/dev/example", "/dev/invalid"];

    // Handlers
    const handleSelectPort = (port: string) => {
        setSelectedPort(port);
    };

    const handleConnect = () => {
        setWaiting(true);

        if (connected) {
            apiRequest("cnc/server", "DELETE")
                .then(() => updateConnected(false))
                .catch((error) => showErrorDialog(error.message))
                .finally(() => setWaiting(false));
            return;
        }

        apiRequest("cnc/server", "POST")
            .then(() => updateConnected(true))
            .catch((error) => showErrorDialog(error.message))
            .finally(() => setWaiting(false));
    };

    // Effect
    useEffect(() => {
        if (connected && !workerStatus.available) {
            updateConnected(false);
        }
    }, [connected, updateConnected, workerStatus.available]);

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
                disabled={!selectedPort || waiting || !workerStatus.available}
                onClick={handleConnect}
                size="md"
            >
                {connected ? <TbPlugX /> : <TbPlug />}
            </Button>
        </div>
    );
}
