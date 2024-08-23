"use client";

import CodeEditor from "@/components/codeEditor";
import ControllerActions from "@/components/controllerActions";
import ControllerStatus from "@/components/controllerStatus";
import Terminal from "@/components/terminal";
import withAuthentication from "@/components/wrappers/authenticationWrapper";

function ControlView() {
    return (
        <section data-section-id="1" className="overflow-hidden py-4">
            <div className="container mx-auto px-4">
                <div className="rounded-xl border bg-white p-4">
                    <h2 className="mb-4 text-center text-3xl font-semibold">Control manual</h2>
                    <div className="grid gap-2 lg:grid-cols-2">
                        <ControllerStatus />
                        <CodeEditor />
                        <ControllerActions />
                        <Terminal sender />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default withAuthentication(ControlView, true);
