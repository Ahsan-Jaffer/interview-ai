import {createContext ,useState, useEffect } from "react";
import { getCurrentUser } from "./services/auth.api.js";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAndSetCurrentUser = async () => {
            setLoading(true);
            try {
                const userData = await getCurrentUser();
                setUser(userData.user);
            } catch (error) {
                console.error("Error fetching current user:", error);
            } finally {
                setLoading(false);
            }
        };

        getAndSetCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );

};  