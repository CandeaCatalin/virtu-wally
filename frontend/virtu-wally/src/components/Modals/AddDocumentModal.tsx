import {FormControl, MenuItem, OutlinedInput, Select} from "@mui/material";
import React, {FC, useContext, useState} from "react";
import {AppContext} from "../../Context/AppContext";
import {ModalsContext} from "../../Context/ModalsContext";
import InputLabel from '@mui/material/InputLabel';

import "./Modals.css";
import {CategoryElement} from "../LeftSideDrawer/Category/CategoryElement";
import {toast} from "react-toastify";
import {Toast} from "../Toast";
import {APIContext} from "../../Context/APIContext";

interface AddDocumentModalProps {
    onClose: any;
}

export const AddDocumentModal: FC<AddDocumentModalProps> = ({onClose}) => {
        const appContext = useContext(AppContext);
        const apiContext = useContext(APIContext);
        const modalsContext = useContext(ModalsContext);
        const [selectedCategory, setSelectedCategory] = useState('');
        const [file, setFile] = useState<File>();
        const [documentName, setDocumentName] = useState("");
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        const onSubmit = async () => {
            await apiContext.uploadDoc(file, selectedCategory, documentName);
        }
        return (
            <>
                <Toast/>
                <div
                    id="deleteModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{position: "relative", top: "20vh"}}
                >
                    <div className="modal-dialog">
                        <div className="modal-content" style={{borderRadius: "20px"}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">
                                    Add a new Document
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={onClose}
                                />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInput"
                                            style={{borderRadius: "10px"}}
                                            placeholder="Travel"
                                            onChange={(e) => {
                                                setDocumentName(e.target.value);
                                            }}
                                        />
                                        <label htmlFor="floatingInput">Document Name</label>
                                    </div>
                                    <div className="form-floating mb-3"
                                         style={{backgroundColor: "white", borderRadius: "10px"}}>
                                        < FormControl sx={{m: 1, width: 300}}>
                                            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                input={<OutlinedInput label="Name"/>}
                                                MenuProps={MenuProps}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {appContext.user.categories.map((category, idx) => (
                                                    <MenuItem value={category.id} key={idx}>{category.name}</MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="mb-3">
                                        <input className="form-control" type="file" id="formFile"
                                               accept="application/pdf,application/vnd.ms-excel"
                                               onChange={(e) => setFile(e.target.files?.[0])}/>
                                    </div>


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn button-modal-sec"
                                    data-bs-dismiss="modal"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn button-modal-prim"
                                    onClick={onSubmit}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
;
