import { resolveAccess } from "@/application/auth/resolveAccess";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppClients } from "@/contexts/appClientsContext";

export default function useAuth(admin = false) {
    const { authClient, sessionStorageClient } = useAppClients();
    const [authorized, setAuthorized] = useState<boolean>(false);

    // Navigation
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Get JWT token and the current URL without the initial slash (/)
        const callbackUrl = path.substring(1) || "";
        const token = sessionStorageClient.getToken();

        const accessDecision = resolveAccess({
            hasToken: Boolean(token),
            isAdmin: admin,
            callbackUrl,
        });

        if (accessDecision.redirectTo) {
            router.push(accessDecision.redirectTo);
            return;
        }

        authClient
            .verify()
            .then((response) => {
                const decision = resolveAccess({
                    hasToken: true,
                    isAdmin: admin,
                    role: response.data?.role,
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
