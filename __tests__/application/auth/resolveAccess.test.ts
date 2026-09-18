import { resolveAccess } from "@/application/auth/resolveAccess";

describe("resolveAccess", () => {
    it("redirects to login when token is missing", () => {
        const decision = resolveAccess({
            hasToken: false,
            isAdmin: false,
            callbackUrl: "tasks",
        });

        expect(decision).toStrictEqual({
            authorized: false,
            redirectTo: "/login?callbackUrl=tasks",
        });
    });

    it("redirects to home when a non-admin user requests an admin route", () => {
        const decision = resolveAccess({
            hasToken: true,
            isAdmin: true,
            role: "user",
            callbackUrl: "",
        });

        expect(decision).toStrictEqual({
            authorized: false,
            redirectTo: "/",
        });
    });

    it("authorizes non-admin routes when token exists", () => {
        const decision = resolveAccess({
            hasToken: true,
            isAdmin: false,
            role: "user",
            callbackUrl: "inventory",
        });

        expect(decision).toStrictEqual({
            authorized: true,
        });
    });

    it("authorizes admin routes for admin role", () => {
        const decision = resolveAccess({
            hasToken: true,
            isAdmin: true,
            role: "admin",
            callbackUrl: "users",
        });

        expect(decision).toStrictEqual({
            authorized: true,
        });
    });

    it("keeps admin routes pending until the role is known", () => {
        const decision = resolveAccess({
            hasToken: true,
            isAdmin: true,
            callbackUrl: "users",
        });

        expect(decision).toStrictEqual({
            authorized: true,
        });
    });
});
