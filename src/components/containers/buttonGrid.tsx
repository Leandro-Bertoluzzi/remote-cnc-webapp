import ButtonInfo from "@/types/ButtonInfo";
import { Button } from "flowbite-react";

// Types definition

export interface ButtonGridProps {
    buttons: ButtonInfo[];
}

// Component

export default function ButtonGrid(props: ButtonGridProps) {
    const { buttons = [] } = props;

    return (
        <div className="my-4 grid gap-2 md:grid-cols-2">
            {buttons.map((button, key) => (
                <Button className="m-auto w-full md:w-40" onClick={button.action} key={key}>
                    {button.type}
                </Button>
            ))}
        </div>
    );
}
