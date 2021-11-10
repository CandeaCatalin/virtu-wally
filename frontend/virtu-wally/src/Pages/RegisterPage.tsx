import { FC, SyntheticEvent, useContext, useState } from "react";
import "./style.css";
import LoginLogo from "../Resources/Images/LoginLogo.svg";
import { AppContext } from "../Context/AppContext";
import { User } from "../Models/User";
import { toast } from "react-toastify";

interface RegisterPageProps {
  visible: boolean;
}

export const RegisterPage: FC<RegisterPageProps> = ({ visible }) => {
  const context = useContext(AppContext);
  const [user, setUser] = useState<User>({
    createdTime: new Date(),
    docs: [],
    email: "",
    firstName: "",
    id: 0,
    imageUrl: "",
    lastName: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      const response = await fetch("/api/Authentication/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user, password }),
      });
      console.log(await response.json());
      context.changePage("Main");
    }
  };
  const validateInputs = () => {
    let returnValue: boolean = true;
    if (user.firstName.length == 0) {
      toast.error("First Name is empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      returnValue = false;
    }
    if (user.lastName.length == 0) {
      toast.error("Last Name is empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      returnValue = false;
    }
    if (user.email.length == 0) {
      toast.error("Email is empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      returnValue = false;
    } else if (!context.validateEmail(user.email)) {
      toast.error("Invalid Email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      returnValue = false;
    }
    if (password.length == 0) {
      toast.error("Password is empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      returnValue = false;
    }
    if (confirmPassword.length == 0) {
      toast.error("Confirm Password is empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      returnValue = false;
    } else if (confirmPassword !== password) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      returnValue = false;
    }
    return returnValue;
  };
  return (
    <>
      {visible && (
        <div className={"vertical-center"}>
          <main className="form-register">
            <img
              className="mb-3 align-items-center"
              src={LoginLogo}
              alt=""
              width="300"
              height="170"
            />
            <div className="box col-12 mb-3">
              <form onSubmit={onSubmit}>
                <h1 className="page-title h3 mb-3 fw-normal">Register</h1>

                <div className="row">
                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="First Name"
                        onChange={(e) => {
                          setUser({ ...user, firstName: e.target.value });
                        }}
                      />
                      <label htmlFor="floatingInput">First Name</label>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Last Name"
                        onChange={(e) => {
                          setUser({ ...user, lastName: e.target.value });
                        }}
                      />
                      <label htmlFor="floatingInput">Last Name</label>
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Confimr password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingPassword">Confirm password</label>
                </div>

                <button
                  className="button-register w-100 btn btn-lg mt-3"
                  type="submit"
                >
                  Register
                </button>

                <div className="checkbox mt-3">
                  <div className="row">
                    <div className="col-9">Already have an account?</div>
                    <div
                      className="col-3"
                      style={{ color: "blue" }}
                      onClick={() => {
                        context.changePage("Login");
                      }}
                    >
                      Sign In
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
};
