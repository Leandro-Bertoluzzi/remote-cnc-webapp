import Tool from "./Tool";

type btnActionType = () => void;

export default interface ToolFormProps {
    exitAction: btnActionType;
    create: boolean;
    toolInfo: Tool;
}
