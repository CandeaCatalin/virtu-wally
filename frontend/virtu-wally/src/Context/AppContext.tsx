import {createContext, FC, useEffect, useState} from "react";
import {Doc} from "../Models/Doc";
import {User} from "../Models/User";
import {Category} from "@mui/icons-material";

type AppContextType = {
    user: User;
    setUser: any;
    isLoading: boolean;
    setIsLoading: any;
    selectedPage: string;
    changePage: any;
    editedDocument: any;
    setEditedDocument: any;

};
// @ts-ignore
export const AppContext = createContext<AppContextType>(null);

export const AppProvider: FC = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedPage, setSelectedPage] = useState("Login");
    const changePage = (newPage: string) => {
        setSelectedPage(newPage);
    };
    const [editedDocument, setEditedDocument] = useState({
        categoryId: 0,
        id: 0,
        name: "",
        uploadedDate: new Date(),
        userId: 0
    })
    const [user, setUser] = useState<User>({
        createdTime: new Date(),
        docs: [],
        email: "",
        firstName: "",
        id: 0,
        imageUrl: "",
        lastName: "",
        categories: [],
    });

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/User", {
                headers: {"Content-Type": "application/json"},
            });
            const content = await response.json();
            if (content.id !== undefined)
                setTimeout(() => {
                    {
                        setUser(content);
                        setIsLoading(false);
                    }
                }, 1000);
            else {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        })();
    }, []);
    useEffect(() => {
        if (user?.id === 0) {
            changePage("Login");
        } else {
            changePage("Main");
        }
    }, [user]);

    const ctx: AppContextType = {
        user: user,
        setUser: setUser,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        selectedPage: selectedPage,
        changePage: changePage,
        editedDocument: editedDocument,
        setEditedDocument: setEditedDocument,
    };
    return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};
