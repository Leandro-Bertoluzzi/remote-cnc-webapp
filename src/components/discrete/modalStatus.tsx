import { Badge } from "flowbite-react";
import { ModalState } from "@/types/GrblStatus";

export function ModalStatus(props: { modal: ModalState }) {
    const { modal } = props;

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            <Badge color="info" size="sm">
                {modal.motion}
            </Badge>
            <Badge color="gray" size="sm">
                {modal.wcs}
            </Badge>
            <Badge color="failure" size="sm">
                {modal.plane}
            </Badge>
            <Badge color="success" size="sm">
                {modal.units}
            </Badge>
            <Badge color="warning" size="sm">
                {modal.distance}
            </Badge>
            <Badge color="indigo" size="sm">
                {modal.feedrate}
            </Badge>
            <Badge color="purple" size="sm">
                {modal.program}
            </Badge>
            <Badge color="pink" size="sm">
                {modal.spindle}
            </Badge>
            <Badge color="info" size="sm">
                {modal.coolant}
            </Badge>
        </div>
    );
}
