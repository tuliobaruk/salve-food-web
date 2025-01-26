import axiosInstance from "@/api/axiosConfig";

export const fetchLojaData = async () => {
	try {
		const response = await axiosInstance.get("/api/loja/minha");
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar dados da loja:", error);
		throw new Error("Não foi possível carregar os dados da loja.");
	}
};
