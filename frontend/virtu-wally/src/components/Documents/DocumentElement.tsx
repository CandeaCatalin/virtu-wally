import React, {FC, SyntheticEvent, useContext, useEffect, useState} from "react";
import carLogo from "../../Resources/Images/car.svg";
import medicalLogo from "../../Resources/Images/hospitalLogo.svg";
import personalLogo from "../../Resources/Images/personLogo.svg";
import customLogo from "../../Resources/Images/customFile.svg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ModalsContext} from "../../Context/ModalsContext";
import {Doc} from "../../Models/Doc";
import {APIContext} from "../../Context/APIContext";
import {AppContext} from "../../Context/AppContext";

interface DocumentElementProps {
    categoryName: string;
    document: Doc;
}

export const DocumentElement: FC<DocumentElementProps> = ({
                                                              categoryName,
                                                              document,
                                                          }) => {
    const [logo, setLogo] = useState("");
    const [open, setOpen] = React.useState(false);
    const apiContext = useContext(APIContext);
    const appContext = useContext(AppContext);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const modalsContext = useContext(ModalsContext);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const deleteDocument = async (event: SyntheticEvent) => {
        await apiContext.deleteDoc(document.id.toString());
        handleClose(event);
    }
    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);
    useEffect(() => {
        if (categoryName === "Car") {
            setLogo(carLogo);
        } else if (categoryName === "Medical") {
            setLogo(medicalLogo);
        } else if (categoryName === "Personal") {
            setLogo(personalLogo);
        } else {
            setLogo(customLogo);
        }
    }, []);
    const openPdf = () => {
        var objbuilder = '';
        objbuilder += ('<object width="100%" height="100%" data="data:application/pdf;base64,');
        objbuilder += (document.fileData);
        objbuilder += ('" type="application/pdf" class="internal">');
        objbuilder += ('<embed src="data:application/pdf;base64,');
        objbuilder += (document.fileData);
        objbuilder += ('" type="application/pdf"  />');
        objbuilder += ('</object>');

        const win = window.open("#", "_blank");
        const title = "my tab title";
        win?.document.write('<html><title>' + title + '</title><body style="margin-top:0px; margin - left:0px; margin - right:0px;margin - bottom:0px;">');
        win?.document.write(objbuilder);
        win?.document.write('</body></html>');

    }
    return (
        <li className="row col-10">
            <div
                className="button-Documents"
                style={{display: "flex", justifyContent: "space-between"}}

            >
                <div onClick={() => openPdf()} style={{display: "flex", marginTop: "5px", width: "100%"}}>
                    <img
                        src={logo}
                        alt={"car"}
                        height={"20px"}
                        style={{
                            marginTop: "3px",
                            marginRight: "10px",
                            marginLeft: "10px",
                        }}
                    />{" "}
                    <div style={{color: "black"}}> {document.name}</div>
                </div>
                <div>
                    <Button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? "composition-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <MoreVertIcon/>
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="left-start"
                        transition
                        disablePortal
                    >
                        {({TransitionProps, placement}) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom-start" ? "left top" : "left bottom",
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                            style={{
                                                paddingTop: "0px",
                                                paddingBottom: "0px",
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() => {
                                                    modalsContext.setIsEditDocumentModalOpen(true);
                                                    appContext.setEditedDocument(document);
                                                }
                                                }
                                            >
                                                <EditIcon/>
                                                Edit
                                            </MenuItem>
                                            <MenuItem onClick={(e: SyntheticEvent) => deleteDocument(e)}>
                                                <DeleteIcon/>
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </li>
    )
        ;
};
