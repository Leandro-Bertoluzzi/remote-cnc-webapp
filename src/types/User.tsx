type UserRole = "user" | "admin";

export default interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}
