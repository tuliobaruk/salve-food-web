import { toast } from "sonner";
import { z } from "zod";
import { CreateItemSchema } from "@/schema/zodSchemas";
import axiosInstance from "@/api/axiosConfig";
import { createFormDataItemRequest } from "@/lib/createFormDataItemRequest";
import { useNavigate } from "react-router-dom";
import CreateItemForm from "@/components/forms/CreateItemForm";
import useFetchCategorias from "@/hooks/useFetchCategorias";
import { useLoja } from "@/context/LojaContext";
import { Button } from "@/components/ui/button";

type CreateItemFormValues = z.infer<typeof CreateItemSchema>;

export default function CreateItemPage() {
	const navigate = useNavigate();
	const { categorias, loading } = useFetchCategorias();
	const { loja } = useLoja();

	async function handleSubmit(values: CreateItemFormValues) {
		try {
			const formData = createFormDataItemRequest(values);
			formData.append("lojaId", String(loja?.id));

			const response = await axiosInstance.post("/api/item", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Item criado com sucesso!");
			console.log("Resposta da API:", response.data);
			setTimeout(() => navigate("/cardapio"), 300);
		} catch (error) {
			toast.error("Falha ao submeter o form, erro detalhado no console.");
			console.error("Erro ao submeter o form", error);
		}
	}

	return (
		<div className="bg-gray-50 min-h-screen p-8">
			<div className="w-full max-w-7xl relative mx-auto">
				<h1 className="text-3xl font-bold text-center mb-6">Criação de Item</h1>
				<Button
					onClick={() => navigate("/cardapio")}
					className="absolute left-0 top-0 flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
				>
					Voltar
				</Button>
			</div>
			<div className="mt-10">
				<CreateItemForm categorias={categorias} loading={loading} onSubmit={handleSubmit} />
			</div>
		</div>
	);
}
