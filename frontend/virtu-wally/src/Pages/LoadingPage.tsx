import LoadingImage from "../Resources/Images/Loading.svg";
export const LoadingPage = () => {
  return (
    <div className={"vertical-center"}>
      <main className="form-signIn ">
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
