import { useState, useEffect } from 'react';
import FileCard from '../components/fileCard';
import CardsList from '../components/cardsList';
import File from '../types/File';
import config from '../config';

export default function FilesView() {
    // Hooks for state variables
    const [files, setFiles] = useState<File[]>([]);
    const { API_PORT, API_HOST } = config;

    /*  Function: updateFiles
    *   Description: Initializes the array of files to display
    */
    function updateFiles() {
        const apiBaseUrl = `http://${API_HOST}:${API_PORT}`;

        fetch(`${apiBaseUrl}/files`)
            .then((res) => res.json())
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                console.log("Connection error: ", error.message);
            });
    }

    // Action to execute at the beginning
    useEffect(() => updateFiles(), []);

    return (
        <CardsList title="Archivos">
            <div className="flex flex-wrap -m-3">
                {files.map((file) => (
                    <FileCard key={file.id} file={file} />
                ))}
            </div>
            {files.length === 0 &&
                <div className="flex flex-wrap -m-3">
                    There are no files
            </div>
            }
        </CardsList>
    )
}
