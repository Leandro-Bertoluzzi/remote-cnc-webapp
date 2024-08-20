import FileInfo from "./FileInfo";
import Material from "./Material";
import Task from "./Task";
import Tool from "./Tool";

export default interface TaskCardProps {
    task: Task;
    show: boolean;
    toolsList: Tool[];
    materialsList: Material[];
    filesList: FileInfo[];
}
