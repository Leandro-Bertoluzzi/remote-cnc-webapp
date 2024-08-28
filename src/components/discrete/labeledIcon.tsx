import { IconType } from "react-icons/lib";

export interface LabeledIconProps {
    Icon: IconType;
    label: string;
}

export default function LabeledIcon({ Icon, label }: LabeledIconProps) {
    return (
        <div className="relative w-20">
            <Icon size={20} />
            <span className="absolute top-0 translate-x-6">{label}</span>
        </div>
    );
}
