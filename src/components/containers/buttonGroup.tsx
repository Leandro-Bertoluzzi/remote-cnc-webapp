import ButtonInfo from "../../types/ButtonInfo";
import CardButton from "../discrete/cardButton";
import { Button } from "flowbite-react";

// Types definition

export interface ButtonGroupProps {
    buttons: ButtonInfo[];
}

// Component

export default function ButtonGroup(props: ButtonGroupProps) {
    const { buttons } = props;

    if (!buttons.length) {
        return <></>;
    }

    if (buttons.length === 1) {
        const button = buttons[0];
        return <CardButton info={button} />;
    }

    return (
        <Button.Group>
            {buttons.map((button, key: number) => (
                <CardButton key={key} info={button} />
            ))}
        </Button.Group>
    );
}

ButtonGroup.defaultProps = {
    buttons: [],
};
