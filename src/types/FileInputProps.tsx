import { ChangeEvent } from 'react';

type btnActionType = (e: ChangeEvent<HTMLInputElement>) => void;

export default interface FileInputProps {
    handleFileChange: btnActionType;
    accept: string;
}
