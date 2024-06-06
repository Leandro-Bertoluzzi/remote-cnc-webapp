import { IconType } from "react-icons/lib";
import { ReactNode } from "react";

export interface TabItem {
    content: ReactNode;
    icon: IconType;
    title: string;
}

export default interface TabGroupProps {
    items: TabItem[];
}
