import type { IUser } from "../types/IUser";
import {getUSer, removeUser } from "./localStorage";
import { navigate } from "./navigate";

    export const checkAuthUser = (): void => {
    const user: IUser | null = getUSer();
    const path = window.location.pathname;
    const isLoginPage = path.includes('login.html');
    const isRegisterPage = path.includes('registro.html');
    const isPublicPage = isLoginPage || isRegisterPage || path === '/' || path.endsWith('index.html');

    if (!user || !user.loggedIn) {
        if (!isPublicPage) {
            window.location.href = '/src/pages/auth/login/login.html';
        }
    } else {
        if (user.role === 'client' && path.includes('/admin/')) {
            window.location.href = '/index.html'; 
        }
    }
};

export const logout = () => {
    removeUser();
    navigate("/src/pages/auth/login/login.html");
};