import { useState, useCallback, useEffect } from "react";
import AuthContext from "./AuthContext";

import authService from "../services/authService";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(() => {
        const storedToken = authService.getStoredToken();
        return storedToken || null;
    });

    const [isLoading, setIsLoading] = useState(() => !!authService.getStoredToken());

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalTab, setAuthModalTab] = useState("login");

    useEffect(() => {

        if (!token) {
            return;
        }

        authService.getProfile(token)
            .then((profile) => {
                const userData = profile.user || profile;
                setUser(userData);
            })
            .catch((err) => {
                console.error("Error al cargar perfil inicial:", err);
                authService.logout();
                setUser(null);
                setToken(null);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [token]);

    const openLoginModal = () => {
        setAuthModalTab("login");
        setIsAuthModalOpen(true);
    };

    const openRegisterModal = () => {
        setAuthModalTab("register");
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const login = async (credentials) => {
        const result = await authService.login(credentials);

        if (result.user) setUser(result.user);
        if (result.token) setToken(result.token);

        return result;
    };

    const register = async (userData) => {
        const result = await authService.register(userData);

        if (result.user) setUser(result.user);
        if (result.token || result.accessToken) setToken(result.token || result.accessToken);

        return result;
    };

    const handleOAuthToken = useCallback(async (tokenValue) => {
        authService.setStoredToken(tokenValue);
        setToken(tokenValue);
        try {
            const response = await authService.getProfile(tokenValue);
            const userData = response?.user || response;
            if (userData) {
                setUser(userData);
            }
        } catch (err) {
            console.error("Error fetching user profile after OAuth redirect:", err);
        }
    }, []);

    const loginWithGoogle = () => {
        authService.loginWithGoogle();
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToken(null);
    };

    const value = {
        user,
        token,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalTab,
        isLoading,
        setAuthModalTab,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
        login,
        loginWithGoogle,
        handleOAuthToken,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
