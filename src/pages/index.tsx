const sections = [
  {
    name: 'Ver estado de tareas',
    description: '',
    href: '#',
  },
  {
    name: 'Monitorizar equipo',
    description: '',
    href: '#',
  },
  {
    name: 'Administrar archivos',
    description: '',
    href: '#',
  },
  {
    name: 'Control manual y calibración',
    description: '',
    href: '#',
  },
  {
    name: 'Administrar tareas',
    description: '',
    href: '#',
  },
  {
    name: 'Administrar usuarios',
    description: '',
    href: '#',
  },
  {
    name: 'Administrar herramientas',
    description: '',
    href: '#',
  },
]

export default function MainMenu() {
  return (
    <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
        <div className="p-4">
          {sections.map((item) => (
            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div>
                <a href={item.href} className="font-semibold text-gray-900">
                  {item.name}
                  <span className="absolute inset-0" />
                </a>
                <p className="mt-1 text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
