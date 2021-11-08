import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginPage, MainPage, RegisterPage } from "./Pages";
import { User } from "./Models/User";

enum MenuItems {
  Main = "Main",
  Login = "Login",
  Register = "Register",
}

function App() {
  const [selectedPage, setSelectedPage] = useState("Login");
  const [user, setUser] = useState<User>({
    firstName: "",
    email: "",
    lastName: "",
    imageUrl: "",
    id: 0,
    createdTime: new Date(),
    docs: [],
  });
  const [isLoading, setIsLoading] = useState(true);
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
      setSelectedPage("Login");
    } else {
      setSelectedPage("Main");
    }
  }, [user]);
  const changePage = (newPage: string) => {
    setSelectedPage(newPage);
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {selectedPage === MenuItems.Main && (
            <MainPage
              visible={selectedPage === MenuItems.Main}
              changePage={changePage}
              user={user}
            />
          )}
          {selectedPage === MenuItems.Login && (
            <LoginPage
              visible={selectedPage === MenuItems.Login}
              changePage={changePage}
            />
          )}
          {selectedPage === MenuItems.Register && (
            <RegisterPage
              visible={selectedPage === MenuItems.Register}
              changePage={changePage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
