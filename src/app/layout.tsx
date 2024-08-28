import "@/styles/globals.css";
import { Metadata } from "next";
import { NavigationBar } from "@/components/navigationBar";
import { NotificationProvider } from "@/contexts/notificationContext";
import NotificationsWrapper from "@/components/wrappers/notificationsWrapper";

export const metadata: Metadata = {
    title: "CNC remoto",
    description: "Acceso a CNC remoto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <NotificationProvider>
                    <NotificationsWrapper>
                        <NavigationBar />
                        {children}
                    </NotificationsWrapper>
                </NotificationProvider>
            </body>
        </html>
    );
}
