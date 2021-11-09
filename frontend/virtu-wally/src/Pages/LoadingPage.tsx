import LoadingImage from "../Resources/Images/Loading.svg";
import LoginLogo from "../Resources/Images/LoginLogo.svg";
export const LoadingPage = () => {
  return (
    <div className={"vertical-center"}>
      <main className="form-signin ">
        <img
          className="mb-4 align-items-center"
          src={LoadingImage}
          alt="Loading"
          width="300"
          height="200"
        />
      </main>
    </div>
  );
};
