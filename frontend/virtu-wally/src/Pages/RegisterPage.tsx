import { FC } from "react";

interface RegisterPageProps {
  visible: boolean;
  changePage: any;
}

export const RegisterPage: FC<RegisterPageProps> = ({
  visible,
  changePage,
}) => {
  return (
    <>
      {visible && (
        <div>
          <button
            onClick={() => {
              changePage("Main");
            }}
          >
            GO TO MAIN PAGE
          </button>
          Register Page
        </div>
      )}
    </>
  );
};
