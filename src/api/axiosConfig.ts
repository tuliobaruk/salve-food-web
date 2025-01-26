import axios, { AxiosInstance } from "axios";
import { setSession, getStoredTokens, logout, doTokenRefresh } from "@/services/authService";

const API_ENDPOINT_URL = import.meta.env.VITE_APP_BACKEND_IP;
const BASE_URL = `http://${API_ENDPOINT_URL}`;

const axiosInstance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(request) => {
		const [accessToken, refreshToken] = getStoredTokens();
		if (accessToken) {
			request.headers.Authorization = `Bearer ${accessToken}`;
			setSession(accessToken, refreshToken);
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (
			(error.response?.status === 401 || error.response?.status === 500) &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			try {
				const [, refreshToken] = getStoredTokens();

				if (!refreshToken) {
					throw new Error("Refresh token não encontrado");
				}

				const { access_token, refresh_token: newRefreshToken } = await doTokenRefresh(refreshToken);

				setSession(access_token, newRefreshToken);

				originalRequest.headers.Authorization = `Bearer ${access_token}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				console.error("Erro ao renovar o token:", refreshError);
				logout();
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
