import { FC, SyntheticEvent, useContext, useState } from "react";
import "./style.css";
import LoginLogo from "../Resources/Images/LoginLogo.svg";
import { AppContext } from "../Context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginPageProps {
  visible: boolean;
}

export const LoginPage: FC<LoginPageProps> = ({ visible }) => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let isValid = validateInputs();
    if (isValid) {
      const response = await fetch("/api/Authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password, email }),
      });
      const content = await response.json();
      if (content.message !== "Invalid Credentials") {
        context.setUser(content.user);
        context.changePage("Main");
      } else {
        toast.error("Invalid Credentials!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const validateInputs = () => {
    let returnValue: boolean = true;
    if (email.length == 0) {
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
    } else if (!context.validateEmail(email)) {
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
    return returnValue;
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {visible && (
        <div className={"vertical-center"}>
          <main className="form-signin">
            <img
              className="mb-4 align-items-center"
              src={LoginLogo}
              alt=""
              width="300"
              height="200"
            />
            <div className="box mb-5">
              <form onSubmit={onSubmit}>
                <h1 className=" page-title h3 mb-3 fw-normal">
                  Please sign in
                </h1>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
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
                <div className="checkbox mt-3">
                  <div className="row">
                    <div
                      style={{ color: "blue" }}
                      onClick={() => {
                        context.changePage("ForgetPassword");
                      }}
                    >
                      Forget password?
                    </div>
                  </div>
                </div>

                <button
                  className="button-login w-100 btn btn-lg mt-3"
                  type="submit"
                >
                  Sign in
                </button>

                <div className="checkbox mt-3">
                  <div className="row">
                    <div className="col-8">Don't have an account?</div>
                    <div
                      className="col-4"
                      style={{ color: "blue" }}
                      onClick={() => {
                        context.changePage("Register");
                      }}
                    >
                      Register
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
