import { Navbar, Tooltip } from "flowbite-react";
import { ReactNode } from "react";

// Type definitions
interface ToolBarItemProps {
    action: () => void;
    children: ReactNode;
    tooltip: string;
    disabled?: boolean;
}

// TOOL BAR ITEM

function ToolBarItem(props: ToolBarItemProps) {
    const { action, children, tooltip, disabled } = props;

    const handleClick = () => {
        action();
    };

    return (
        <Navbar.Link href="javascript:void(0);" onClick={handleClick} disabled={disabled}>
            <Tooltip content={tooltip}>{children}</Tooltip>
        </Navbar.Link>
    );
}

ToolBarItem.defaultProps = {
    disabled: false,
};

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
