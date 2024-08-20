export interface AxisValueProps {
    axis: string;
    machineCoordinate: number;
    workCoordinate: number;
}

export default function AxisValue(props: AxisValueProps) {
    const { axis, machineCoordinate, workCoordinate } = props;

    return (
        <div className="rounded-lg bg-teal-900 px-8 py-2 font-mono font-semibold text-slate-400">
            {`${axis.toUpperCase()}: ${machineCoordinate.toFixed(2)} (${workCoordinate.toFixed(2)})`}
        </div>
    );
}
