import {FC, SyntheticEvent, useContext, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Toast} from "../components/Toast";
import LoginLogo from "../Resources/Images/LoginLogo.svg";
import {APIContext} from "../Context/APIContext";


interface ForgetPasswordProps {

}

export const ForgetPassword: FC<ForgetPasswordProps> = ({}) => {
    const {email} = useParams();
    const {userId} = useParams();
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const apiContext = useContext(APIContext);
    const onSubmit= async (e:SyntheticEvent)=>{
        e.preventDefault();
        await apiContext.forgetPassword(password,confirmPassword,email, userId);
    }
    return (<><Toast/>

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
                            Change your password
                        </h1>

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
                            <label htmlFor="floatingPassword">New password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                            <label htmlFor="floatingPassword">Confirm new password</label>
                        </div>


                        <button
                            className="button-login w-100 btn btn-lg mt-3"
                            type="submit"
                        >
                            <Link to="/" >Submit</Link>

                        </button>


                    </form>
                </div>
            </main>
        </div>
        )</>);
}
