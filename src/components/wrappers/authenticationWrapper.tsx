"use client";

import Loader from "../discrete/loader";
import { ComponentType } from "react";
import useAuth from "@/hooks/useauth";

const withAuthentication = (WrappedComponent: ComponentType, authorize = false) => {
    return function AuthenticatedComponent() {
        const authorized = useAuth(authorize);

        if (!authorized) {
            return <Loader />;
        }

        return <WrappedComponent />;
    };
};

export default withAuthentication;
