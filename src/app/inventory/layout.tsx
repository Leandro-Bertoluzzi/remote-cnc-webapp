import { Metadata } from "next";
import { MaterialsProvider } from "@/contexts/materialsContext";
import { ToolsProvider } from "@/contexts/toolsContext";

export const metadata: Metadata = {
    title: "Inventario",
    description: "Administración de inventario",
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <MaterialsProvider>
            <ToolsProvider>{children}</ToolsProvider>
        </MaterialsProvider>
    );
}
