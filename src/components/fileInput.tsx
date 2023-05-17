import { ChangeEvent, useRef, useState } from 'react';
import FileInputProps from '../types/FileInputProps';

export default function FileInput(props: FileInputProps) {
    // Props
    const { handleFileChange, accept } = props;

    // Hooks for state variables
    const [file, setFile] = useState<File>();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        // Redirect the click event onto the hidden input element
        inputRef.current?.click();
    };

    const handleFileUpdates = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        setFile(e.target.files[0]);
        handleFileChange(e);
    };

    return (
        <div>
            <label className="block font-medium" htmlFor="file-input">Archivo a subir</label>

            {/* Custom button to select and upload a file */}
            <button onClick={handleUploadClick} className="inline-flex flex-wrap items-center px-6 py-2.5 text-sm font-medium border rounded-lg bg-white" href="#">
                {file ? 'Cambiar' : 'Elegir'}
            </button>

            {file &&
                <span>{file.name}</span>
            }

            {/* Notice the `display: hidden` on the input */}
            <input
                type="file"
                id="file-input"
                ref={inputRef}
                onChange={handleFileUpdates}
                accept={accept}
                style={{ display: 'none' }}
            />
        </div>
    );
}
