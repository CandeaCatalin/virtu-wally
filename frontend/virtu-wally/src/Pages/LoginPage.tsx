import {FC, SyntheticEvent, useContext, useState} from "react";
import "./style.css";
import LoginLogo from "../Resources/Images/LoginLogo.svg";
import {AppContext} from "../Context/AppContext";
import "react-toastify/dist/ReactToastify.css";
import {APIContext} from "../Context/APIContext";
import {Toast} from "../components/Toast";

interface LoginPageProps {
    visible: boolean;
}

export const LoginPage: FC<LoginPageProps> = ({visible}) => {
    const appContext = useContext(AppContext);
    const apiContext = useContext(APIContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const onSubmit = async (e: SyntheticEvent) => {

        e.preventDefault();
        setIsSubmitted(true);
        await apiContext.login(email, password);
        setIsSubmitted(false);
    };

    return (
        <>
            <Toast/>
            {visible && (
                <div className={"vertical-center"}>
                    <main className="form-signIn">
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
                                            style={{color: "blue"}}
                                            onClick={() => {
                                                appContext.changePage("ForgetPassword");
                                            }}
                                        >
                                            Forget password?
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="button-login w-100 btn btn-lg mt-3"
                                    type="submit"
                                    disabled={isSubmitted}
                                >
                                    Sign in
                                </button>

                                <div className="checkbox mt-3">
                                    <div className="row">
                                        <div className="col-8">Don't have an account?</div>
                                        <div
                                            className="col-4"
                                            style={{color: "blue"}}
                                            onClick={() => {
                                                appContext.changePage("Register");
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
