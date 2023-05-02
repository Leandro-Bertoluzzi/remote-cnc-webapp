import FileCard from '../components/fileCard';

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
        <section data-section-id="1" data-share="" data-category="cards" className="py-4 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="pt-5 px-5 pb-6 bg-white border rounded-xl">
            <h3 className="mb-7 text-lg font-semibold">Archivos</h3>
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
          </div>
        </div>
      </section>
    )
  }