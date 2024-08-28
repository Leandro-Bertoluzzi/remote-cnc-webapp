import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Monitor",
    description: "Monitoreo de tarea en progreso",
};

export default function MonitorLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
