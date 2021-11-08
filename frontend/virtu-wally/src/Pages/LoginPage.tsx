import { FC, SyntheticEvent, useState } from "react";
import "./style.css";
import LoginLogo from "../Resources/Images/LoginLogo.svg";

interface LoginPageProps {
  visible: boolean;
  changePage: any;
}

export const LoginPage: FC<LoginPageProps> = ({ visible, changePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("/api/Authentication/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password, email }),
    });
    changePage("Main");
  };
  return (
    <>
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
                    type="email"
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
                        changePage("ForgetPassword");
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
                        changePage("Register");
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
