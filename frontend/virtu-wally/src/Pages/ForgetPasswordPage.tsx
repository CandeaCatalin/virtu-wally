import { FC, SyntheticEvent, useState } from "react";
import "./style.css";
import LoginLogo from "../Resources/Images/LoginLogo.svg";

interface ForgetPasswordPageProps {
  visible: boolean;
  changePage: any;
}

export const ForgetPasswordPage: FC<ForgetPasswordPageProps> = ({
  visible,
  changePage,
}) => {
  const [email, setEmail] = useState("");
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("/api/Authentication/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    changePage("Login");
  };
  return (
    <>
      {visible && (
        <div className="vertical-center mb-5">
          <main className="form-signin">
            <img
              className="mb-4 align-items-center"
              src={LoginLogo}
              alt=""
              width="300"
              height="200"
            />
            <div className="box col-12 mb-3">
              <form onSubmit={onSubmit}>
                <h1 className="page-title mb-4 fw-normal h3">
                  Forget password
                </h1>

                <div className="form-floating mb-4">
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

                <div className="checkbox mb-3">
                  <button
                    className="button-reset-password w-100 btn btn-lg"
                    type="submit"
                  >
                    Submit
                  </button>

                  <div className="row mt-3">
                    <div
                      style={{ color: "blue" }}
                      onClick={() => {
                        changePage("Login");
                      }}
                    >
                      Back to Sign In
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
