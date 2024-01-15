import FileInfo from "./FileInfo";
import Material from "./Material";
import Task from "./Task";
import Tool from "./Tool";

type btnActionType = () => void;
type setStringActionType = (str: string) => void;

export default interface TaskFormProps {
    exitAction: btnActionType;
    create: boolean;
    taskInfo?: Task;
    toolsList: Tool[];
    materialsList: Material[];
    filesList: FileInfo[];
    setError: setStringActionType;
}
