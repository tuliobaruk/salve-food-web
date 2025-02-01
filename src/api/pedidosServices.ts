import axios from "@/api/axiosConfig";

const API_ENDPOINT_URL = import.meta.env.VITE_APP_BACKEND_IP;
const BASE_URL = `http://${API_ENDPOINT_URL}`;


export const getPedidos = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/api/pedidos/loja`); // Endpoint do backend
		return response.data.content; // Retorna os pedidos do backend
	} catch (error) {
		console.error("Erro ao buscar pedidos:", error);
		throw error;
	}
};
