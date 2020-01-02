import { createContext, useState } from "react";
import { firebase } from "../firebase/firestore";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            setUser(true);
        } else {
            setUser(false);
        }
    });

    return (
        <UserContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
