import { toast } from "sonner";
import CreateStoreForm from "@/components/forms/CreateStoreForm";
import useFetchSegmentos from "@/hooks/useFetchSegmentos";
import { z } from "zod";
import { CreateStoreSchema } from "@/schema/zodSchemas";
import axiosInstance from "@/api/axiosConfig";
import { createFormDataStoreRequest } from "@/lib/createFormDataStoreRequest";
import { useNavigate } from "react-router-dom";
import { useLoja } from "@/context/LojaContext";
import { useEffect } from "react";

type CreateStoreFormValues = z.infer<typeof CreateStoreSchema>;

export default function CreateStorePage() {
	const { loja } = useLoja();
	const navigate = useNavigate();
	const { segmentos, loading } = useFetchSegmentos();

	useEffect(() => {
		if (loja) {
			navigate("/dashboard");
		}
	}, [loja, navigate]);

	async function handleSubmit(values: CreateStoreFormValues) {
		try {
			const formData = createFormDataStoreRequest(values);

			const response = await axiosInstance.post("/api/loja", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Loja criada com sucesso!");
			console.log("Resposta da API:", response.data);
			setTimeout(() => navigate("/dashboard"), 300);
		} catch (error) {
			toast.error("Falha ao submeter o form, erro detalhado no console.");
			console.error("Erro ao submeter o form", error);
		}
	}

	return (
		<div className="bg-gray-50 min-h-screen p-8">
			<h1 className="text-2xl font-bold mb-6 text-center">Criação de Loja</h1>
			<CreateStoreForm segmentos={segmentos} loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
