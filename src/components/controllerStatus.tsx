import AxisValue from "./discrete/axisValue";
import apiRequest, { getEventSource } from "@/services/apiService";
import GrblStatus, { Coordinates, ModalState } from "@/types/GrblStatus";
import { ModalStatus } from "./discrete/modalStatus";
import { ProgressBar } from "./discrete/progressBar";
import { useState, useEffect } from "react";

// Constants
const DISCONNECTED = "DISCONNECTED";
const INITIAL_POS = { x: 0.0, y: 0.0, z: 0.0 };
const INITIAL_MODAL = {
    motion: "G0",
    wcs: "G54",
    plane: "G17",
    units: "G21",
    distance: "G90",
    feedrate: "G94",
    program: "M0",
    spindle: "M5",
    coolant: "M9",
};

export default function ControllerStatus() {
    const [status, setStatus] = useState<string>(DISCONNECTED);
    const [mpos, setMpos] = useState<Coordinates>(INITIAL_POS);
    const [wpos, setWpos] = useState<Coordinates>(INITIAL_POS);
    const [modal, setModal] = useState<ModalState>(INITIAL_MODAL);
    const [tool_id, setToolId] = useState<number>(0);
    const [tool, setTool] = useState<string>("");
    const [feedrate, setFeedrate] = useState<number>(0.0);
    const [spindle, setSpindle] = useState<number>(0.0);
    const [totalLines, setTotalLines] = useState<number>(0);
    const [sentLines, setSentLines] = useState<number>(0);
    const [processedLines, setProcessedLines] = useState<number>(0);

    useEffect(() => {
        const es = getEventSource("grbl_status");

        es.onopen = () => console.log(">>> Connection opened!");
        es.onerror = (e) => console.log("ERROR!", e);

        es.addEventListener("grbl_status", (event) => {
            if (event.data) {
                updateStatus(JSON.parse(event.data));
            }
        });

        return () => es.close();
    }, []);

    const updateStatus = (data: GrblStatus) => {
        if (data.status) {
            setStatus(data.status.activeState);
            setMpos(data.status.mpos);
            setWpos(data.status.wpos);
        }

        if (data.sent_lines) {
            setSentLines(data.sent_lines);
        }
        if (data.processed_lines) {
            setProcessedLines(data.processed_lines);
        }
        if (data.total_lines) {
            setTotalLines(data.total_lines);
        }

        if (data.parserstate) {
            updateTool(data.parserstate.tool);
            setModal(data.parserstate.modal);
            setFeedrate(data.parserstate.feedrate);
            setSpindle(data.parserstate.spindle);
        }
    };

    const updateTool = (tool_index: number) => {
        if (tool_index === tool_id) {
            return;
        }

        apiRequest(`tools/${tool_index}`, "GET")
            .then((data) => {
                setTool(data.name);
                setToolId(tool_index);
            })
            .catch((error) => {
                console.log("ERROR!", error);
            });
    };

    return (
        <div className="justify-self-center">
            <div className="flex flex-col md:flex-row">
                <div>
                    <div className="rounded-lg bg-gray-400 px-8 py-2 text-center font-semibold">
                        {status}
                    </div>
                    <AxisValue axis="x" machineCoordinate={mpos.x} workCoordinate={wpos.x} />
                    <AxisValue axis="y" machineCoordinate={mpos.y} workCoordinate={wpos.y} />
                    <AxisValue axis="z" machineCoordinate={mpos.z} workCoordinate={wpos.z} />
                </div>
                <div className="mx-4 my-auto">
                    <div>{`Herramienta: ${tool}`}</div>
                    <div>{`Velocidad de avance: ${feedrate}`}</div>
                    <div>{`Velocidad de husillo: ${spindle}`}</div>
                </div>
            </div>
            <ProgressBar value={sentLines} total={totalLines} label="Enviado" />
            <ProgressBar value={processedLines} total={totalLines} label="Procesado" />
            <ModalStatus modal={modal} />
        </div>
    );
}
