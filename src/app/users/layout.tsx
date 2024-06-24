import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Usuarios",
    description: "Administración de usuarios",
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
