import React from "react";
import "./App.css";
import { Main } from "./Main";
import { AppProvider } from "./Context/AppContext";
import { APIProvider } from "./Context/APIContext";
import { ModalsProvider } from "./Context/ModalsContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ForgetPassword} from "./Pages/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ModalsProvider>
          <APIProvider>
            <Routes>
              <Route path="/" element={<Main />} />

              <Route path="/ForgetPassword/:email/:userId" element = {<ForgetPassword/>}/>
            </Routes>
          </APIProvider>
        </ModalsProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
