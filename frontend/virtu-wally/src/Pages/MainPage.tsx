import {FC, useContext} from "react";
import "./style.css";
import React from "react";
import {AppContext} from "../Context/AppContext";
import {Header} from "../components/Header/Header";
import {Modals} from "../components/Modals";
import {ModalsContext} from "../Context/ModalsContext";
import carLogo from "../Resources/Images/car.svg";
import {DocumentElement} from "../components/Documents/DocumentElement";
import {Toast} from "../components/Toast";
import {doc} from "prettier";

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

                        <div className="main-div">
                            <div className="documents"></div>
                            {/* aici punem categoriile fiecarui user */}
                            <ul
                                className="document-list"
                                style={{overflowY: "auto", height: "70vh"}}
                            >
                                {appContext.user.docs.map((Doc, idx) => <DocumentElement
                                    categoryName={Doc.category.name} document={Doc} key={idx}/>)}

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
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
};
