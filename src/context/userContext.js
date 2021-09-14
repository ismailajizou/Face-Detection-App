const { createContext, useContext, useState } = require("react");

const getItem = key => {
    return JSON.parse(localStorage.getItem(key)) || null;
}

export const setItem = (key, value) => {
    try{
        localStorage.setItem(key, JSON.stringify(value));
    } catch(err) {
        console.error(err);
    }
}

export const UserContext = createContext({currentUser: null, setCurrentUser: () => {}});

export const useUser = () => {
    return useContext(UserContext);
}

export default function UserProvider({children}) {
    const [currentUser, setCurrentUser] = useState(getItem('user'));
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}