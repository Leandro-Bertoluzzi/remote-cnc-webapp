import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tareas",
    description: "Administración de tareas",
};

export default function TasksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
