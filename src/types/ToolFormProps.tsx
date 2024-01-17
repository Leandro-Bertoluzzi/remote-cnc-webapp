import Tool from "./Tool";

type btnActionType = () => void;
type setStringActionType = (str: string) => void;

export default interface ToolFormProps {
    exitAction: btnActionType;
    create: boolean;
    toolInfo: Tool;
    setError: setStringActionType;
    setNotification: setStringActionType;
}
