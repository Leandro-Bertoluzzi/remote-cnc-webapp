import CardButton from './cardButton';
import CardProps from '../types/CardProps';

export default function Card(props: CardProps) {
    const { mainText, additionalText, buttons } = props;

    return (
        <div className="w-full p-3 border-t">
          <div className="flex flex-wrap items-center justify-between -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-wrap items-center -m-1.5">
                <div className="w-auto p-1.5">
                  <h3 className="font-heading mb-1 font-semibold">{mainText}</h3>
                    {additionalText.map((text, key: number) => (
                        <p key={key} className="text-xs text-neutral-500">{text}</p>
                    ))}
                </div>
              </div>
            </div>
            {buttons.map((button, key: number) => (
                <CardButton key={key} buttonType={button} isFirst={key == 0 ? true : false} />
            ))}
          </div>
        </div>
    )
  }