import Tool from './Tool';

type btnActionType = (file: Tool) => void;

export default interface ToolCardProps {
    tool: Tool;
    updateAction: btnActionType;
}
