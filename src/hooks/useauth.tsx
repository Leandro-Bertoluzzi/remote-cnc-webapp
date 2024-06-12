import apiRequest from "@/services/apiService";
import { getJwtToken } from "@/services/storage";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function useAuth() {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // Get JWT token and the current URL without the initial slash (/)
        const callbackUrl = router.route.substring(1);
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
            return;
        }

        apiRequest("users/auth", "GET")
            .then(() => {
                setAuthorized(true);
            })
            .catch(() => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return authorized;
}