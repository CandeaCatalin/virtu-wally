import { FC, SyntheticEvent, useState } from "react";
import "./signin.css";
import Logo from "../logo.svg";
interface LoginPageProps {
  visible: boolean;
  changePage: any;
}

export const LoginPage: FC<LoginPageProps> = ({ visible, changePage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(email + "" + password);
  };
  return (
    <>
      {visible && (
        <div className={"vertical-center"}>
          <main className="form-signin">
            <form onSubmit={onSubmit}>
              <img className="mb-4" src={Logo} alt="" width="72" height="57" />
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

              <div className="form-floating">
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
              <div className="form-floating">
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
                    changePage("Register");
                  }}
                >
                  Don't have an account?
                </div>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign in
              </button>
              <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
          </main>
        </div>
      )}
    </>
  );
};
