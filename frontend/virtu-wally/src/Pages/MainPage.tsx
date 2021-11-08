import {FC, useEffect, useState} from "react";
import {User} from "../Models/User";

interface MainPageProps {
    visible: boolean;
    user: User;
    changePage: any;
}

export const MainPage: FC<MainPageProps> = ({visible, changePage,user}) => {

    return (
        <>
            {visible && (
                <>
                <div>
                    Id: {user.id}
                    Name: {user.firstName + " " + user.lastName}
                    Email: {user.email}
                </div>
                <button onClick={()=>console.log(user)}>jet</button>
                </>
            )}
        </>
    );
};
