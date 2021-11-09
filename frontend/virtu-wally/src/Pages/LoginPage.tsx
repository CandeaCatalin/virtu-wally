import { FC, SyntheticEvent, useContext, useState } from "react";
import "./signin.css";
import LoginLogo from "../Resources/Images/LoginLogo.svg";
import { AppContext } from "../Context/AppContext";

interface LoginPageProps {
  visible: boolean;
}

export const LoginPage: FC<LoginPageProps> = ({ visible }) => {
  const context = useContext(AppContext);
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
    const content = await response.json();
    context.setUser(content.user);
    context.changePage("Main");
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
              height="250"
            />
            <form onSubmit={onSubmit}>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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

              <div className="checkbox mb-3">
                <div
                  onClick={() => {
                    context.changePage("Register");
                  }}
                >
                  You don't have an account?
                </div>
              </div>
              <button className="w-100 btn btn-lg btn-light" type="submit">
                Sign in
              </button>
            </form>
          </main>
        </div>
      )}
    </>
  );
};
