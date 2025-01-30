/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import {
	login,
	logout,
	setSession,
	getStoredTokens,
	introspect,
	doTokenRefresh,
} from "@/services/authService";
import axiosInstance from "@/api/axiosConfig";

interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	roles: string[];
}

interface AuthContextType {
	isAuthenticated: boolean;
	user: User | null;
	login: (email: string, password: string) => Promise<User>;
	logout: () => void;
}

import { Loading } from "@/components/Loading";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleLogin = async (email: string, password: string): Promise<User> => {
		const authResponse = await login(email, password);
		setSession(authResponse.access_token, authResponse.refresh_token);

		const userResponse = await axiosInstance.get("/api/auth/introspect");

		const userData: User = {
			id: userResponse.data.sub,
			name: userResponse.data.name,
			email: userResponse.data.email,
			phone: userResponse.data.phone,
			roles: userResponse.data.realm_access.roles,
		};

		setUser(userData);
		setIsAuthenticated(true);

		return userData;
	};

	const handleLogout = () => {
		logout();
		setIsAuthenticated(false);
		setUser(null);
	};

	useEffect(() => {
		const initializeAuth = async () => {
			const [accessToken, refreshToken] = getStoredTokens();

			if (accessToken) {
				try {
					const userData = await introspect();

					setUser({
						id: userData.sub,
						name: userData.name,
						email: userData.email,
						phone: userData.phone,
						roles: userData.realm_access.roles,
					});
					setIsAuthenticated(true);
				} catch (error) {
					console.error("Erro ao validar o token:", error);

					if (refreshToken) {
						try {
							const { access_token, refresh_token: newRefreshToken } =
								await doTokenRefresh(refreshToken);

							setSession(access_token, newRefreshToken);

							const userData = await introspect();

							setUser({
								id: userData.sub,
								name: userData.name,
								email: userData.email,
								phone: userData.phone,
								roles: userData.realm_access.roles,
							});
							setIsAuthenticated(true);
						} catch (refreshError) {
							console.error("Erro ao renovar o token:", refreshError);
							logout();
						}
					} else {
						logout();
						window.location.href = "/login";
					}
				}
			}
			setIsLoading(false);
		};

		initializeAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user, login: handleLogin, logout: handleLogout }}
		>
			{!isLoading ? children : <Loading />}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
