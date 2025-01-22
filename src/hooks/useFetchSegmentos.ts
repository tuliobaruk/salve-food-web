import { useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosConfig";

const useFetchSegmentos = () => {
	const [segmentos, setSegmentos] = useState<{ id: string; nome: string; emoji: string }[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchSegmentos = async () => {
			setLoading(true);
			try {
				const response = await axiosInstance.get(
					"/api/segmento?page=0&size=100&sortBy=id&sortDir=asc",
				);
				setSegmentos(response.data.content || []);
			} catch (error) {
				console.error("Erro ao buscar os segmentos, verificar conexão com a API", error);
				toast.error("Não foi possível carregar os segmentos.");
			} finally {
				setLoading(false);
			}
		};

		fetchSegmentos();
	}, []);

	return { segmentos, loading };
};

export default useFetchSegmentos;
