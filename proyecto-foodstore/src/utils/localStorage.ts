import type { IUser } from "../types/IUser";

export const saveUser = (user: IUser) => {
    const parseUser = JSON.stringify(user);
    localStorage.setItem("userData", parseUser);
};
export const getUSer = (): IUser | null => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};
export const removeUser = () => {
    localStorage.removeItem("userData");
};