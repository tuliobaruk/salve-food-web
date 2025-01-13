import axios from "@/api/axiosConfig";

interface AuthResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	refresh_expires_in: number;
	token_type: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
	const response = await axios.post<AuthResponse>("/api/auth/login", { username, password });
	return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
	const response = await axios.post<AuthResponse>("/api/auth/refresh", {
		refreshToken: refreshToken,
	});
	return response.data;
};

export const setSession = (accessToken: string | null, refreshToken: string | null) => {
	if (accessToken) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
		localStorage.setItem("access_token", accessToken);
		if (refreshToken) {
			localStorage.setItem("refresh_token", refreshToken);
		}
	} else {
		delete axios.defaults.headers.common["Authorization"];
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
	}
};

export const getStoredTokens = () => {
	const accessToken = localStorage.getItem("access_token");
	const refreshToken = localStorage.getItem("refresh_token");
	return [accessToken, refreshToken];
};

export const logout = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
	setSession(null, null);
};

export interface UserIntrospectionResponse {
	sub: string;
	resource_access: {
		[key: string]: {
			roles: string[];
		};
	};
	email_verified: boolean;
	iss: string;
	typ: string;
	preferred_username: string;
	given_name: string;
	sid: string;
	aud: string[];
	acr: string;
	realm_access: {
		roles: string[];
	};
	phone: string;
	azp: string;
	scope: string;
	name: string;
	exp: string;
	iat: string;
	family_name: string;
	jti: string;
	email: string;
}

export const introspect = async (): Promise<UserIntrospectionResponse> => {
	const response = await axios.get<UserIntrospectionResponse>("/api/auth/introspect");
	return response.data;
};
