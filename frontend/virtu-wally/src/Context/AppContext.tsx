import { createContext, FC, useContext, useEffect, useState } from "react";
import { User } from "../Models/User";

type AppContextType = {
  user: User;
  setUser: any;
  isLoading: boolean;
  setIsLoading: any;
  selectedPage: string;
  changePage: any;
  validateEmail: any;
};
// @ts-ignore
export const AppContext = createContext<AppContextType>(null);

export const AppProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPage, setSelectedPage] = useState("Login");

  const changePage = (newPage: string) => {
    setSelectedPage(newPage);
  };

  const [user, setUser] = useState<User>({
    createdTime: new Date(),
    docs: [],
    email: "",
    firstName: "",
    id: 0,
    imageUrl: "",
    lastName: "",
  });
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/Authentication/user", {
        headers: { "Content-Type": "application/json" },
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
    if (user.id === 0) {
      changePage("Login");
    } else {
      changePage("Main");
    }
  }, [user]);
  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const ctx: AppContextType = {
    user: user,
    setUser: setUser,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    selectedPage: selectedPage,
    changePage: changePage,
    validateEmail: validateEmail,
  };
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};
