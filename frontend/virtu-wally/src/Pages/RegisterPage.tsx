import { FC } from "react";

interface RegisterPageProps {
  visible: boolean;
}

export const RegisterPage: FC<RegisterPageProps> = ({ visible }) => {
  return (
    <>
      {visible && (
        <div>
          <button onClick={() => {}}>GO TO MAIN PAGE</button>
          Register Page
        </div>
      )}
    </>
  );
};
