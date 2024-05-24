type btnActionType = () => void;

export default interface ButtonInfo {
    type: string;
    action: btnActionType;
}

export interface ButtonInfoArray {
    [key: string]: ButtonInfo[];
}
