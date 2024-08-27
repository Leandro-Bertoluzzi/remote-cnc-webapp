import { Metadata } from "next";
import { UsersProvider } from "@/contexts/usersContext";

export const metadata: Metadata = {
    title: "Usuarios",
    description: "Administración de usuarios",
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
    return <UsersProvider>{children}</UsersProvider>;
}
