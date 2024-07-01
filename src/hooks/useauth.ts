import apiRequest from "@/services/apiService";
import { getJwtToken } from "@/services/storage";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useAuth(admin = false) {
    const [authorized, setAuthorized] = useState<boolean>(false);

    // Navigation
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Get JWT token and the current URL without the initial slash (/)
        const callbackUrl = path.substring(1) || "";
        const token = getJwtToken();

        if (!token) {
            router.push(`/login?callbackUrl=${callbackUrl}`);
            return;
        }

        apiRequest("users/auth", "GET")
            .then((response) => {
                if (admin && response.data.role != "admin"){
                    router.push("/");
                    return;
                }
                setAuthorized(true);
            })
            .catch(() => router.push(`/login?callbackUrl=${callbackUrl}`));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return authorized;
}
