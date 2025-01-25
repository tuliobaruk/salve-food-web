import { toast } from "sonner";
import { z } from "zod";
import { CreateItemSchema } from "@/schema/zodSchemas";
import axiosInstance from "@/api/axiosConfig";
import { createFormDataItemRequest } from "@/lib/createFormDataItemRequest";
import { useNavigate } from "react-router-dom";
import CreateItemForm from "@/components/CreateItemForm";
import useFetchCategorias from "@/hooks/useFetchCategorias";

type CreateItemFormValues = z.infer<typeof CreateItemSchema>;

export default function CreateItemPage() {
	const navigate = useNavigate();
	const { categorias, loading } = useFetchCategorias();

	async function handleSubmit(values: CreateItemFormValues) {
		try {
			const formData = createFormDataItemRequest(values);
			formData.append("lojaId", (await axiosInstance.get("/api/loja/minha")).data.id);

			const response = await axiosInstance.post("/api/item", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Item criado com sucesso!");
			console.log("Resposta da API:", response.data);
			setTimeout(() => navigate("/dashboard"), 300);
		} catch (error) {
			toast.error("Falha ao submeter o form, erro detalhado no console.");
			console.error("Erro ao submeter o form", error);
		}
	}

	return (
		<div className="bg-gray-50 min-h-screen p-8">
			<h1 className="text-2xl font-bold mb-6 text-center">Criação de Items</h1>
			<CreateItemForm categorias={categorias} loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
