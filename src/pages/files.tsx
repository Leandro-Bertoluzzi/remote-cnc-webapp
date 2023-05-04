import FileCard from '../components/fileCard';
import CardsList from '../components/cardsList';

const files = [
    {
      id: 1,
      name: 'archivo1.gcode',
      description: 'Just an example',
    },
    {
      id: 2,
      name: 'archivo2.gcode',
      description: 'Another example',
    },
    {
      id: 3,
      name: 'archivo1-20230502-190205.gcode',
      description: 'An example with timestamp',
    },
    {
      id: 4,
      name: 'example.txt',
      description: 'An example with .txt file extension',
    },
  ]

export default function FilesView() {
    return (
        <CardsList title="Archivos">
            <div className="flex flex-wrap -m-3">
                {files.map((file, key) => (
                    <FileCard key={key} file={file} />
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