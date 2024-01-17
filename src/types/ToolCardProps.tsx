import Tool from './Tool';

type setStringActionType = (str: string) => void;

export default interface ToolCardProps {
    tool: Tool;
    setError: setStringActionType;
    setNotification: setStringActionType;
}
