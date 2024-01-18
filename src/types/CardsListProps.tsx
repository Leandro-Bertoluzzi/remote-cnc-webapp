import { ReactNode } from "react";

type btnActionType = () => void;

export default interface CardListProps {
    title: string;
    children: ReactNode;
    showAddItemBtn: boolean;
    addItemBtnAction?: btnActionType;
    addItemBtnText?: string;
}
