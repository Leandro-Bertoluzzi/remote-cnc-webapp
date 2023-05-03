import FileCard from '../components/fileCard';
import CardsList from '../components/cardsList';

const files = [
    {
      name: 'archivo1.gcode',
      description: 'Just an example',
    },
    {
      name: 'archivo2.gcode',
      description: 'Another example',
    },
    {
      name: 'archivo1-20230502-190205.gcode',
      description: 'An example with timestamp',
    },
    {
      name: 'example.txt',
      description: 'An example with .txt file extension',
    },
  ]

export default function FilesView() {
    return (
        <CardsList title="Archivos">
            <div className="flex flex-wrap -m-3">
                {files.map((file) => (
                    <FileCard
                        fileName={file.name}
                        fileDescription={file.description}
                    />
                ))}
            </div>
            {files.length === 0 &&
            <div className="flex flex-wrap -m-3">
                "There are no files"
            </div>
            }
        </CardsList>
    )
  }