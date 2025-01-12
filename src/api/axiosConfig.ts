/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { refreshToken, setSession, getStoredTokens, logout } from "./authService";

const API_ENDPOINT_URL = import.meta.env.VITE_APP_BACKEND_IP;
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (token) {
			prom.resolve(token);
		} else {
			prom.reject(error);
		}
	});

	failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
	baseURL: `http://${API_ENDPOINT_URL}`,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

		if (error.response?.status === 401 && !originalRequest._retry) {
			const { refreshToken: storedRefreshToken } = getStoredTokens();

			if (!storedRefreshToken) {
				logout();
				return Promise.reject(error);
			}

			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						if (originalRequest.headers) {
							originalRequest.headers["Authorization"] = `Bearer ${token}`;
						}
						return axiosInstance(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const newTokens = await refreshToken(storedRefreshToken);

				setSession(newTokens.access_token, newTokens.refresh_token);
				processQueue(null, newTokens.access_token);

				if (originalRequest.headers) {
					delete originalRequest.headers["Authorization"];
					originalRequest.headers["Authorization"] = `Bearer ${newTokens.access_token}`;
				}

				return axiosInstance(originalRequest);
			} catch (err) {
				processQueue(err, null);
				logout();
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
