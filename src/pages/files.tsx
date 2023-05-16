import { useState, useEffect } from 'react';
import FileCard from '../components/fileCard';
import CardsList from '../components/cardsList';
import File from '../types/File';
import EmptyCard from '../components/emptyCard';
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
            {files.length === 0 ? (
                <EmptyCard itemName="archivos guardados" />
            ) : (
                    <>
                        {
                            files.map((file) => (
                                <FileCard key={file.id} file={file} />
                            ))
                        }
                    </>
                )
            }
        </CardsList>
    )
}
