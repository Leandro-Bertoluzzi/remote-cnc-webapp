import { Progress } from "flowbite-react";
import ProgressBarProps from "@/types/ProgressBarProps";
import { useState, useEffect } from "react";

export function ProgressBar(props: ProgressBarProps) {
    const { value, total, label } = props;

    // State
    const [progress, setProgress] = useState<number>(0.0);

    useEffect(() => {
        const newProgress = parseFloat(((100 * value) / total).toFixed(2));
        setProgress(newProgress);
    }, [value, total]);

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
