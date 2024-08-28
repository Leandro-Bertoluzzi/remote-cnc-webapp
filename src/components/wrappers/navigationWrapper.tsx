"use client";

import { NavigationBar } from "../navigationBar";
import { ReactNode } from "react";

export default function NavigationWrapper({ children }: { children: ReactNode }) {
    return (
        <>
            <NavigationBar />
            <section data-section-id="1" className="overflow-hidden py-4">
                <div className="container mx-auto px-4">{children}</div>
            </section>
        </>
    );
}
