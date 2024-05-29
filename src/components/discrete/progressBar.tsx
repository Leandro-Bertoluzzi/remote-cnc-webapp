import { Progress } from "flowbite-react";
import ProgressBarProps from "@/types/ProgressBarProps";

export function ProgressBar(props: ProgressBarProps) {
    const { value, label } = props;

    return (
        <Progress
            progress={value}
            textLabel={label}
            color="teal"
            size="xl"
            labelProgress
            labelText={label !== undefined}
            textLabelPosition="outside"
        />
    );
}
