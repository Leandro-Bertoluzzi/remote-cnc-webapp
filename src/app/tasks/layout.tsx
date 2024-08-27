import { Metadata } from "next";
import { TasksProvider } from "@/contexts/tasksContext";

export const metadata: Metadata = {
    title: "Tareas",
    description: "Administración de tareas",
};

export default function TasksLayout({ children }: { children: React.ReactNode }) {
    return <TasksProvider>{children}</TasksProvider>;
}
