import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";

import { login, register, logout, getCurrentUser } from "../services/auth.api";


export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);
    
    const handleLogin = async ({email, password}) => {
        setLoading(true);
        try {
            const userData = await login({ email, password });
            setUser(userData.user);
            setLoading(false);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const userData = await register({ username, email, password });
            setUser(userData.user);
        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        setLoading(true);
        try {
            const userData = await getCurrentUser();
            setUser(userData.user);
        } catch (error) {
            console.error("Fetch current user error:", error);
        } finally {
            setLoading(false);
        }
    };

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

    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout, fetchCurrentUser };
}