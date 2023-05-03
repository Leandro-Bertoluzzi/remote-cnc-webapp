import CardButton from '../components/cardButton';

export default function UserCard(props: any) {
    const {name, email, role} = props;

    return (
        <div className="w-full p-3 border-t">
          <div className="flex flex-wrap items-center justify-between -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-wrap items-center -m-1.5">
                <div className="w-auto p-1.5">
                  <h3 className="font-heading mb-1 font-semibold">{name}</h3>
                  <p className="text-xs text-neutral-500">{role}</p>
                  <p className="text-xs text-neutral-500">{email}</p>
                </div>
              </div>
            </div>
            <CardButton buttonType="Editar" isFirst />
            <CardButton buttonType="Eliminar" />
          </div>
        </div>
    )
  }