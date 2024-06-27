import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Control manual",
    description: "Control manual y calibración",
};

export default function ControlLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
