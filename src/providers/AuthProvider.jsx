import { createContext, useState } from "react";

export const AuthContext = createContext(false);

const AuthProvider = ({children}) => {
    const [authStatus, setAuthStatus] = useState(false);

    return (
        <AuthContext.Provider value={{authStatus, setAuthStatus}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider