import { FilesProvider } from "@/contexts/filesContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Archivos",
    description: "Administración de archivos",
};

export default function FilesLayout({ children }: { children: React.ReactNode }) {
    return <FilesProvider>{children}</FilesProvider>;
}
