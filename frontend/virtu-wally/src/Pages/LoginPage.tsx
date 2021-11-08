import {FC, SyntheticEvent, useState} from "react";
import "./signin.css";
import LoginLogo from "../Resources/Images/LoginLogo.svg";

interface LoginPageProps {
    visible: boolean;
    changePage: any;
}

export const LoginPage: FC<LoginPageProps> = ({visible, changePage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch(
            "/api/Authentication/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({password, email}),
            }
        );
        changePage("Main");
    };
    return (
        <>
            {visible && (
                <div className={"vertical-center"}>
                    <main className="form-signin">
                        <form onSubmit={onSubmit}>
                            <img
                                className="mb-4 align-items-center"
                                src={LoginLogo}
                                alt=""
                                width="300"
                                height="250"
                            />
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
                        </form>
                    </main>
                </div>
            )}
        </>
    );
};
