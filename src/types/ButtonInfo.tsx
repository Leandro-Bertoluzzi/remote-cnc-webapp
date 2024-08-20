export default interface ButtonInfo {
    type: string;
    action: () => void;
}

export interface ButtonInfoArray {
    [key: string]: ButtonInfo[];
}
