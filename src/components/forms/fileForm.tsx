import { ChangeEvent, useState } from 'react';
import apiRequest from '../../services/apiService';
import FileFormProps from '../../types/FileFormProps';
import FileInput from '../fileInput';

export default function FileForm(props: FileFormProps) {
    // Props
    const { exitAction } = props;

    // Hooks for state variables
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("user_id", "1");
        formData.append("file", file, file.name);

        apiRequest('files', 'POST', formData)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));

        exitAction();
    };

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center flex-wrap py-20 bg-neutral-500 bg-opacity-80 overflow-y-auto">
            <div className="container px-4 mx-auto">
                <div className="pt-5 max-w-md mx-auto bg-neutral-50 border border-neutral-100 rounded-xl">
                    <div className="px-6 pb-7">
                        <div className="flex flex-wrap justify-between mb-5 -m-2">
                            <div className="w-auto p-2">
                                <h3 className="font-heading mb-1 text-lg text-neutral-600 font-semibold">Nuevo archivo</h3>
                                <p className="text-sm text-neutral-400 font-medium">Selecciona un archivo para subir</p>
                            </div>
                            <div className="w-auto p-2">
                                <a onClick={exitAction} className="relative top-1 text-neutral-300 hover:text-neutral-400" href="#">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.96967 12.9697C3.67678 13.2626 3.67678 13.7374 3.96967 14.0303C4.26256 14.3232 4.73744 14.3232 5.03033 14.0303L3.96967 12.9697ZM14.0303 5.03033C14.3232 4.73744 14.3232 4.26256 14.0303 3.96967C13.7374 3.67678 13.2626 3.67678 12.9697 3.96967L14.0303 5.03033ZM5.03033 3.96967C4.73744 3.67678 4.26256 3.67678 3.96967 3.96967C3.67678 4.26256 3.67678 4.73744 3.96967 5.03033L5.03033 3.96967ZM12.9697 14.0303C13.2626 14.3232 13.7374 14.3232 14.0303 14.0303C14.3232 13.7374 14.3232 13.2626 14.0303 12.9697L12.9697 14.0303ZM5.03033 14.0303L14.0303 5.03033L12.9697 3.96967L3.96967 12.9697L5.03033 14.0303ZM3.96967 5.03033L12.9697 14.0303L14.0303 12.9697L5.03033 3.96967L3.96967 5.03033Z" fill="currentColor"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="mb-5 w-full overflow-x-auto">
                            <FileInput handleFileChange={handleFileChange} accept=".gcode, .txt"  />
                        </div>
                        <div>
                            <a onClick={handleUploadClick} className="flex items-center justify-center py-1 text-sm text-white font-semibold bg-neutral-600 rounded-lg focus:ring-4 focus:ring-neutral-400" href="#">Subir</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
