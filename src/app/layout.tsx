import "@/styles/globals.css";
import { Metadata } from "next";
import { NotificationProvider } from "@/contexts/notificationContext";
import NotificationsWrapper from "@/components/wrappers/notificationsWrapper";
import { AppClientsProvider } from "@/contexts/appClientsContext";

export const metadata: Metadata = {
    title: "CNC remoto",
    description: "Acceso a CNC remoto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AppClientsProvider>
                    <NotificationProvider>
                        <NotificationsWrapper>{children}</NotificationsWrapper>
                    </NotificationProvider>
                </AppClientsProvider>
            </body>
        </html>
    );
}
