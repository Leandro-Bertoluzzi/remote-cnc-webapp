import { Navbar, Tooltip } from "flowbite-react";
import { MouseEventHandler, ReactNode } from "react";

// Type definitions
interface ToolBarItemProps {
    action: () => void;
    children: ReactNode;
    tooltip: string;
    disabled?: boolean;
}

// TOOL BAR ITEM

function ToolBarItem(props: ToolBarItemProps) {
    const { action, children, tooltip, disabled = false } = props;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        action();
    };

    return (
        <Navbar.Link href="#" onClick={handleClick} disabled={disabled}>
            <Tooltip content={tooltip}>{children}</Tooltip>
        </Navbar.Link>
    );
}

// TOOL BAR

export default function ToolBar(props: { options: ToolBarItemProps[] }) {
    const { options } = props;

    return (
        <Navbar fluid rounded>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {options.map((option) => (
                    <ToolBarItem
                        key={option.tooltip}
                        tooltip={option.tooltip}
                        action={option.action}
                        disabled={option.disabled}
                    >
                        {option.children}
                    </ToolBarItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    );
}
