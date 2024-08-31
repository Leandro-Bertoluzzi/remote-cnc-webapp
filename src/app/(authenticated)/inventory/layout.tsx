import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inventario",
    description: "Administración de inventario",
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
