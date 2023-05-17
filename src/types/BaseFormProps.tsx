import { ReactNode } from 'react';

type btnActionType = () => void;

export default interface BaseFormProps {
    title: string;
    subtitle: string;
    exitAction: btnActionType;
    children: ReactNode;
    btnSubmitAction: btnActionType;
    btnSubmitText: string;
}
