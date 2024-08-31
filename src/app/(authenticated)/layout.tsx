import { Metadata } from "next";
import { ItemsProvider } from "@/contexts/itemsContext";
import NavigationWrapper from "@/components/wrappers/navigationWrapper";

export const metadata: Metadata = {
    title: "CNC remoto",
    description: "Acceso a CNC remoto",
};

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <NavigationWrapper>
            <ItemsProvider>{children}</ItemsProvider>
        </NavigationWrapper>
    );
}
