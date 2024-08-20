import FileInfo from "./FileInfo";
import Material from "./Material";
import Task from "./Task";
import Tool from "./Tool";

export default interface TaskFormProps {
    exitAction: () => void;
    create: boolean;
    taskInfo?: Task;
    toolsList: Tool[];
    materialsList: Material[];
    filesList: FileInfo[];
    setError: (message: string) => void;
    setNotification: (message: string) => void;
}
