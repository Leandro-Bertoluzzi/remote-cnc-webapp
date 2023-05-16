import { ReactNode } from 'react';

export default interface CardListProps {
    title: string;
    children: ReactNode;
    showAddItemBtn: boolean;
    addItemBtnText?: string;
}
