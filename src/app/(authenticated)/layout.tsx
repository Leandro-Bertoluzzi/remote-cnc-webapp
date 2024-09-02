import { Metadata } from "next";
import { ItemsProvider } from "@/contexts/itemsContext";
import NavigationWrapper from "@/components/wrappers/navigationWrapper";
import { WorkerStatusProvider } from "@/contexts/workerContext";

export const metadata: Metadata = {
    title: "CNC remoto",
    description: "Acceso a CNC remoto",
};

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <WorkerStatusProvider>
            <NavigationWrapper>
                <ItemsProvider>{children}</ItemsProvider>
            </NavigationWrapper>
        </WorkerStatusProvider>
    );
}
