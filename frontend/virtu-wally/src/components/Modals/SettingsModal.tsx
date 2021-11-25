import { FC, useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { ModalsContext } from "../../Context/ModalsContext";
import "./Modals.css";
import { User } from "../../Models/User";
import { APIContext } from "../../Context/APIContext";
import { Toast } from "../Toast";

interface SettingsModalProps {
  onClose: any;
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const appContext = useContext(AppContext);
  const modalsContext = useContext(ModalsContext);
  const apiContext = useContext(APIContext);
  const [newUser, setNewUser] = useState<User>({
    createdTime: new Date(),
    docs: [],
    email: "",
    firstName: "",
    id: 0,
    imageUrl: "",
    lastName: "",
    categories: [],
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = async () => {
    newUser.id = appContext.user.id;
    await apiContext.settings(
      newUser,
      currentPassword,
      newPassword,
      confirmPassword
    );
  };

  return (
    <div
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ position: "relative", top: "15vh" }}
    >
      <Toast />
      <div className="modal-dialog">
        <div className="modal-content" style={{ borderRadius: "20px" }}>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="form-floating mb-3 col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    style={{ borderRadius: "10px" }}
                    placeholder="Travel"
                    onChange={(e) => {
                      setNewUser({ ...newUser, firstName: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="floatingInput"
                    style={{ color: "rgb(138 139 139)", left: "10px" }}
                  >
                    {newUser.firstName.length === 0
                      ? appContext.user.firstName
                      : "First Name"}
                  </label>
                </div>
                <div className="form-floating mb-3 col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    style={{ borderRadius: "10px" }}
                    placeholder="Travel"
                    onChange={(e) => {
                      setNewUser({ ...newUser, lastName: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="floatingInput"
                    style={{ color: "rgb(138 139 139)", left: "10px" }}
                  >
                    {newUser.lastName.length === 0
                      ? appContext.user.lastName
                      : "Last Name"}
                  </label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setNewUser({ ...newUser, email: e.target.value });
                  }}
                />
                <label
                  htmlFor="floatingInput"
                  style={{ color: "rgb(138 139 139)", left: "10px" }}
                >
                  {newUser.email.length === 0 ? appContext.user.email : "Email"}
                </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                <label
                  htmlFor="floatingInput"
                  style={{ color: "rgb(138 139 139)", left: "10px" }}
                >
                  New password
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <label
                  htmlFor="floatingInput"
                  style={{ color: "rgb(138 139 139)", left: "10px" }}
                >
                  Confirm new password
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
                <label
                  htmlFor="floatingInput"
                  style={{ color: "rgb(138 139 139)", left: "10px" }}
                >
                  Current password <span style={{ color: "red" }}>*</span>
                </label>
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
