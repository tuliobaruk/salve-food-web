/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect } from "react";
import { login, logout, setSession, getStoredTokens } from "../api/authService";

interface AuthContextType {
	isAuthenticated: boolean;
	user: any;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	const [user, setUser] = useState<any>(null);

	const handleLogin = async (email: string, password: string) => {
		const authResponse = await login(email, password);
		setSession(authResponse.access_token, authResponse.refresh_token);
		setIsAuthenticated(true);
		setUser({ email });
	};

	const handleLogout = () => {
		logout();
		setIsAuthenticated(false);
		setUser(null);
	};

	useEffect(() => {
		const { accessToken } = getStoredTokens();
		if (accessToken) {
			setSession(accessToken, null);
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user, login: handleLogin, logout: handleLogout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
