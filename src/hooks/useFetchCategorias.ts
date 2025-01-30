import { useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosConfig";

const useFetchCategorias = () => {
	const [categorias, setCategorias] = useState<{ id: string; nome: string }[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCategorias = async () => {
			setLoading(true);
			try {
				const response = await axiosInstance.get("/api/categoria-item");
				setCategorias(response.data || []);
			} catch (error) {
				console.error("Erro ao buscar as categorias de item, verificar conexão com a API", error);
				toast.error("Não foi possível carregar as categorias de item");
			} finally {
				setLoading(false);
			}
		};

		fetchCategorias();
	}, []);

	return { categorias, loading };
};

export default useFetchCategorias;
