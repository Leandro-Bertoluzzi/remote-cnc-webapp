import apiRequest from "@/services/apiService";
import { Button } from "flowbite-react";
import { FaArrowAltCircleLeft, FaCircle } from "react-icons/fa";
import LabeledNumberInput from "./discrete/labeledNumberInput";
import { useState } from "react";

interface JoystickButtonProps {
    index: number;
    onclick: () => void;
}

function JoystickButton(props: JoystickButtonProps) {
    const { index, onclick } = props;
    const angle = 45 * (index + 1);

    return (
        <Button onClick={onclick} className="m-auto w-full md:w-40">
            <FaArrowAltCircleLeft style={{ rotate: `${angle}deg` }} />
        </Button>
    );
}

export default function Joystick() {
    const [stepX, setStepX] = useState<number>(0.0);
    const [stepY, setStepY] = useState<number>(0.0);
    const [stepZ, setStepZ] = useState<number>(0.0);
    const [feedrate, setFeedrate] = useState<number>(0.0);
    //const [units, setUnits] = useState<number>(0.0);

    // Handlers
    const handleStepXChange = (step_x: number) => {
        setStepX(step_x);
    };

    const handleStepYChange = (step_y: number) => {
        setStepY(step_y);
    };

    const handleStepZChange = (step_z: number) => {
        setStepZ(step_z);
    };

    const handleFeedrateChange = (feedrate: number) => {
        setFeedrate(feedrate);
    };

    const handleMove = (x: number, y: number, z: number) => {
        const move_x = x * stepX;
        const move_y = y * stepY;
        const move_z = z * stepZ;

        if (move_x == 0 && move_y == 0 && move_z == 0) return;

        if (feedrate == 0) return; // TODO: Alertar al usuario

        const body = {
            x: move_x,
            y: move_y,
            z: move_z,
            feedrate: feedrate,
            units: "milimeters",
            mode: "distance_incremental",
        };

        apiRequest("cnc/jog", "POST", body, true)
            .then((response) => console.log("SUCCESS: ", response))
            .catch((error) => console.log("ERROR: ", error));
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-2">
                <JoystickButton index={0} onclick={() => handleMove(-1, 1, 0)} />
                <JoystickButton index={1} onclick={() => handleMove(0, 1, 0)} />
                <JoystickButton index={2} onclick={() => handleMove(1, 1, 0)} />
                <JoystickButton index={7} onclick={() => handleMove(-1, 0, 0)} />
                <Button className="m-auto w-full md:w-40">
                    <FaCircle />
                </Button>
                <JoystickButton index={3} onclick={() => handleMove(1, 0, 0)} />
                <JoystickButton index={6} onclick={() => handleMove(-1, -1, 0)} />
                <JoystickButton index={5} onclick={() => handleMove(0, -1, 0)} />
                <JoystickButton index={4} onclick={() => handleMove(1, -1, 0)} />
            </div>
            <div className="m-4 grid grid-cols-2 gap-2">
                <LabeledNumberInput
                    label="Paso en X"
                    name="step-x"
                    value={stepX}
                    handleChange={handleStepXChange}
                    min={0.0}
                    max={10.0}
                    step={0.25}
                />
                <LabeledNumberInput
                    label="Paso en Y"
                    name="step-y"
                    value={stepY}
                    handleChange={handleStepYChange}
                    min={0.0}
                    max={10.0}
                    step={0.25}
                />
                <LabeledNumberInput
                    label="Paso en Z"
                    name="step-z"
                    value={stepZ}
                    handleChange={handleStepZChange}
                    min={0.0}
                    max={10.0}
                    step={0.25}
                />
                <LabeledNumberInput
                    label="Feedrate"
                    name="feedrate"
                    value={feedrate}
                    handleChange={handleFeedrateChange}
                    min={0.0}
                    max={1000.0}
                    step={25.0}
                />
            </div>
        </>
    );
}
