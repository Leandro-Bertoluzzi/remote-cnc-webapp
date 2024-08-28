import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Acceso",
    description: "Panel de acceso",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
