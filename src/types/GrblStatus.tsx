export interface Coordinates {
    x: number;
    y: number;
    z: number;
}

export interface ModalState {
    motion: string;
    wcs: string;
    plane: string;
    units: string;
    distance: string;
    feedrate: string;
    program: string;
    spindle: string;
    coolant: string;
}

export default interface GrblStatus {
    sent_lines?: number;
    processed_lines?: number;
    total_lines?: number;
    status?: {
        activeState: string;
        mpos: Coordinates;
        wpos: Coordinates;
        ov: number[];
        subState?: string;
        wco: Coordinates;
        pinstate?: string;
        line?: number;
        accessoryState?: string;
    };
    parserstate?: {
        modal: ModalState;
        tool: number;
        feedrate: number;
        spindle: number;
    };
}
