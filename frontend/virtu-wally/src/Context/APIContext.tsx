import {createContext, FC, useContext} from "react";
import {User} from "../Models/User";
import {AppContext} from "./AppContext";
import {toast} from "react-toastify";
import {ModalsContext} from "./ModalsContext";

type APIContextType = {
    login: any;
    register: any;
    signOut: any;
    settings: any;
    uploadImage: any;
    forgetPassword: any;
    forgetPasswordSendMail: any;
};
// @ts-ignore
export const APIContext = createContext<APIContextType>(null);

export const APIProvider: FC = ({children}) => {
    const appContext = useContext(AppContext);
    const modalsContext = useContext(ModalsContext);
    const login = async (email: string, password: string) => {
        const response = await fetch("/api/Authentication/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({password, email}),
        });
        const content = await response.json();

        if (content.message === undefined) {
            appContext.setUser(content.user);
            appContext.changePage("Main");
        } else {
            toast.error(content.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const register = async (
        user: User,
        password: string,
        confirmPassword: string
    ) => {
        if (password === confirmPassword) {
            const response = await fetch("/api/Authentication/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({...user, password}),
            });
            const content = await response.json();
            if (content.message === undefined) {
                appContext.changePage("Login");
                toast.success("Account registered! Please activate your account.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error(content.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error("Passwords must match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const signOut = async () => {
        await fetch("/api/Authentication/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        });
        appContext.changePage("Login");
    };
    const settings = async (
        user: User,
        password: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        if (newPassword === confirmPassword) {
            const response = await fetch("/api/user/settings", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({...user, password, newPassword}),
            });
            const content = await response.json();
            if (content.message === undefined) {
                appContext.setUser(content);
                modalsContext.setIsSettingsModalOpen(false);
            } else {
                toast.error(content.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error("Passwords must match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const uploadImage = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/user/UploadImage", {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        appContext.setUser(await response.json());
    };
    const forgetPassword = async (password: string, confirmPassword: string, email: string, userId: number) => {
        if (password === confirmPassword) {
            const response = await fetch("/api/Authentication/ForgetPassword", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({email, userId, password}),
            });
            const content = await response.json();
            appContext.changePage("Login");
            toast.success("Password changed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error("Passwords must match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const forgetPasswordSendMail = async (email: string) => {
        const response = await fetch("/api/Authentication/ForgetPasswordSendEmail", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            credentials: "include",
            body: JSON.stringify({email}),
        });
        const content = await response.json();
        appContext.changePage("Login");
        toast.success(content.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const ctx: APIContextType = {
        login: (email: string, password: string) => login(email, password),
        register: (user: User, password: string, confirmPassword: string) =>
            register(user, password, confirmPassword),
        signOut: signOut,
        settings: (
            user: User,
            password: string,
            newPassword: string,
            confirmPassword: string
        ) => settings(user, password, newPassword, confirmPassword),
        uploadImage: (file: any) =>
            uploadImage(file),
        forgetPassword: (password: string, confirmPassword: string, email: string, userId: number) =>
            forgetPassword(password, confirmPassword, email, userId),
        forgetPasswordSendMail: (email: string) => forgetPasswordSendMail(email)
    };
    return <APIContext.Provider value={ctx}>{children}</APIContext.Provider>;
};
