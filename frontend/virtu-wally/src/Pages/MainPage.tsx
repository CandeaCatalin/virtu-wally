import {FC, useContext} from "react";
import "./style.css";
import React from "react";
import {AppContext} from "../Context/AppContext";
import {Header} from "../components/Header/Header";
import {Modals} from "../components/Modals";
import {ModalsContext} from "../Context/ModalsContext";
import {DocumentElement} from "../components/Documents/DocumentElement";
import {Toast} from "../components/Toast";

import customLogo from "../Resources/Images/customFile.svg";

interface MainPageProps {
    visible: boolean;
}

export const MainPage: FC<MainPageProps> = ({visible}) => {
    const appContext = useContext(AppContext);
    const modalContext = useContext(ModalsContext);

    return (
        <>
            <Toast/>
            {visible ? (
                <>
                    <div>
                        <Modals/>
                    </div>
                    <div className="mainpage-body">
                        <Header/>

                        {appContext.user.docs.length !== 0 ? <>
                            <div className="main-div">
                                <div className="documents"></div>

                                <ul
                                    className="document-list"
                                    style={{overflowY: "auto", height: "70vh"}}
                                >
                                    {appContext.user.docs.map((Doc, idx) => <DocumentElement
                                        categoryName={Doc.category?.name} document={Doc} key={idx}/>)}

                                </ul>
                            </div>
                            <div className="add-document-1">
                                <div
                                    className="add-document"
                                    onClick={() => modalContext.setIsAddDocumentModalOpen(true)}
                                >
                                    <div className="addition-logo">+</div>
                                </div>
                            </div>
                        </> : <div className={"empty-docs"}>
                            <img src={customLogo} alt={"document image"} style={{height: "40vh"}}/>
                            <button className={"button-login w-80 btn btn-lg mt-3"}
                                    onClick={() => modalContext.setIsAddDocumentModalOpen(true)}>
                                Add your first document
                            </button>
                        </div>}
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
};
