import GrblStatus from "@/types/GrblStatus";
import GrblMessage from "@/types/GrblMessage";

export interface ControllerActionResponse {
    success: string;
}

export interface PauseStateResponse {
    paused: boolean;
}

export interface JogPayload {
    x: number;
    y: number;
    z: number;
    feedrate: number;
    units: string;
    mode: string;
}

export interface ControllerClient {
    subscribeStatus: (channel: string, onStatus: (status: GrblStatus) => void) => () => void;
    subscribeMessages: (channel: string, onMessage: (message: GrblMessage) => void) => () => void;
    sendCommand: (command: string) => Promise<ControllerActionResponse>;
    jog: (payload: JogPayload) => Promise<ControllerActionResponse>;
    connectServer: () => Promise<void>;
    disconnectServer: () => Promise<void>;
    togglePause: () => Promise<PauseStateResponse>;
    getToolName: (toolIndex: number) => Promise<{ name: string }>;
}