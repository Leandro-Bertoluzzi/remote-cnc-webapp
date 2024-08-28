"use client";

import { Card } from "flowbite-react";
import CodeEditor from "@/components/codeEditor";
import ControllerActions from "@/components/controllerActions";
import ControllerStatus from "@/components/controllerStatus";
import Terminal from "@/components/terminal";
import withAuthentication from "@/components/wrappers/withAuthentication";

function ControlView() {
    return (
        <Card>
            <h2 className="mb-4 text-center text-3xl font-semibold">Control manual</h2>
            <div className="grid gap-2 lg:grid-cols-2">
                <ControllerStatus />
                <CodeEditor />
                <ControllerActions />
                <Terminal sender />
            </div>
        </Card>
    );
}

export default withAuthentication(ControlView, true);
