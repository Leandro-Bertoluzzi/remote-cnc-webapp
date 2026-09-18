export interface AccessContext {
    hasToken: boolean;
    isAdmin: boolean;
    role?: string;
    callbackUrl: string;
}

export interface AccessDecision {
    authorized: boolean;
    redirectTo?: string;
}

export function resolveAccess({ hasToken, isAdmin, role, callbackUrl }: AccessContext): AccessDecision {
    if (!hasToken) {
        return {
            authorized: false,
            redirectTo: `/login?callbackUrl=${callbackUrl}`,
        };
    }

    if (isAdmin && role !== undefined && role !== "admin") {
        return {
            authorized: false,
            redirectTo: "/",
        };
    }

    return { authorized: true };
}
