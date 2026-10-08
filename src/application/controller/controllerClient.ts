import GrblStatus from "@/types/GrblStatus";

export interface ControllerClient {
    subscribeStatus: (channel: string, onStatus: (status: GrblStatus) => void) => () => void;
    getToolName: (toolIndex: number) => Promise<{ name: string }>;
}