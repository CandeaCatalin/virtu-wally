import React from "react";
import "./App.css";
import { Main } from "./Main";
import { AppProvider } from "./Context/AppContext";
import { APIProvider } from "./Context/APIContext";
import { ModalsProvider } from "./Context/ModalsContext";

function App() {
  return (
    <AppProvider>
      <APIProvider>
        <ModalsProvider>
          <Main />
        </ModalsProvider>
      </APIProvider>
    </AppProvider>
  );
}

export default App;
