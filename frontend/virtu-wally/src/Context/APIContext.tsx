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
    uploadDoc: any;
    deleteDoc: any;
    editDoc: any;
};
// @ts-ignore
export const APIContext = createContext<APIContextType>(null);

export const APIProvider: FC = ({children}) => {
    const appContext = useContext(AppContext);
    const modalsContext = useContext(ModalsContext);
    const formData = new FormData();
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

        formData.append("file", file);
        const response = await fetch("/api/user/UploadImage", {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        const content = await response.json();
        appContext.setUser(content);
    };
    const forgetPassword = async (password: string, confirmPassword: string, email: string, userId: number) => {
        debugger;
        if (password === confirmPassword) {
            const response = await fetch("/api/Authentication/ForgetPassword", {
                method: "POST",
                headers: {"Content-Type": "application/json", 'Accept': 'application/json'},
                credentials: "include",
                body: JSON.stringify({email, userId, password}),
            });

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
        return true;
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
    const uploadDoc = async (file: any, selectedCategory: string, docName: string) => {

        const formData = new FormData();
        if (file?.type === 'application/pdf' && selectedCategory.length !== 0 && docName.length !== 0) {
            formData.append("File", file);
            formData.append("CategoryId", selectedCategory);
            formData.append("UserId", appContext.user.id.toString());
            formData.append("Name", docName);
            const response = await fetch('/api/Doc/Add', {
                method: 'POST',
                credentials: "include",
                body: formData
            })
            const content = await response.json();
            if (content.message !== undefined) {
                toast.error(content.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                appContext.setUser(content);
                modalsContext.setIsAddDocumentModalOpen(false);
                toast.success("Document added", {
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
            toast.error("All fields must be filled!", {
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
    const deleteDoc = async (docId: number) => {
        const userId = appContext.user.id.toString();
        const response = await fetch('/api/Doc/delete', {
            method: 'POST',
            credentials: "include",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({docId, userId}),
        })
        const content = await response.json();
        appContext.setUser(content);
        toast.success("Document deleted!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const editDoc = async (file: any, selectedCategory: string, docName: string, docId: string) => {

        if (file?.type === 'application/pdf' || file === undefined) {
            formData.append("File", file);
            formData.append("CategoryId", selectedCategory);
            formData.append("UserId", appContext.user.id.toString());
            formData.append("Name", docName);
            formData.append("Id", docId);
            const response = await fetch('/api/Doc/edit', {
                method: 'POST',
                credentials: "include",
                body: formData
            })
            const content = await response.json();

            if (content.message !== undefined) {
                toast.error(content.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                appContext.setUser(content);

                modalsContext.setIsEditDocumentModalOpen(false);
                toast.success("Document edited!", {
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
            forgetPasswordSendMail: (email: string) => forgetPasswordSendMail(email),
            uploadDoc: (file: any, selectedCategory: string, docName: string) =>
                uploadDoc(file, selectedCategory, docName),
            deleteDoc: (docId: number) => deleteDoc(docId),
            editDoc: (file: any, selectedCategory: string, docName: string, docId: string) => editDoc(file, selectedCategory, docName, docId)
        }
    ;
    return <APIContext.Provider value={ctx}>{children}</APIContext.Provider>;
};
