import apiRequest from "@/services/apiService";
import { resolveAccess } from "@/application/auth/resolveAccess";
import { getJwtToken } from "@/services/storage";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type AuthResponse = {
    data?: {
        role?: string;
    };
};

export default function useAuth(admin = false) {
    const [authorized, setAuthorized] = useState<boolean>(false);

    // Navigation
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Get JWT token and the current URL without the initial slash (/)
        const callbackUrl = path.substring(1) || "";
        const token = getJwtToken();

        const accessDecision = resolveAccess({
            hasToken: Boolean(token),
            isAdmin: admin,
            callbackUrl,
        });

        if (accessDecision.redirectTo) {
            router.push(accessDecision.redirectTo);
            return;
        }

        apiRequest("users/auth", "GET")
            .then((response) => {
                const authResponse = response as AuthResponse;
                const decision = resolveAccess({
                    hasToken: true,
                    isAdmin: admin,
                    role: authResponse.data?.role,
                    callbackUrl,
                });

                if (decision.redirectTo) {
                    router.push(decision.redirectTo);
                    return;
                }
                setAuthorized(true);
            })
            .catch(() => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return authorized;
}
