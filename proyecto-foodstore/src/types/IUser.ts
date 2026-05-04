import type { Rol } from "./Rol";

export interface IUser {
    nombre: string;
    email: string;
    loggedIn: boolean;
    role: Rol;
}