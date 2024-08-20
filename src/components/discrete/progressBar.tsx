import { Progress } from "flowbite-react";

export interface ProgressBarProps {
    value: number;
    total: number;
    label?: string;
}

export function ProgressBar(props: ProgressBarProps) {
    const { value, total, label } = props;

    // Calculate progress
    const progress = parseFloat(((100 * value) / total).toFixed(2));

    return (
        <Progress
            progress={progress}
            textLabel={label}
            color="teal"
            size="xl"
            labelProgress
            labelText={label !== undefined}
            textLabelPosition="outside"
        />
    );
}
