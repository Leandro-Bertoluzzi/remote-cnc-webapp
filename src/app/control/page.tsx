"use client";

import CodeEditor from "@/components/codeEditor";
import ControllerActions from "@/components/controllerActions";
import ControllerStatus from "@/components/controllerStatus";
import Loader from "@/components/discrete/loader";
import Terminal from "@/components/terminal";
import useAuth from "@/hooks/useauth";

export default function ControlView() {
    // User authentication
    const authorized = useAuth(true);
    if (!authorized) {
        return <Loader />;
    }

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
