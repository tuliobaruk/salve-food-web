import { toast } from "sonner";
import { z } from "zod";
import { CreateDriverSchema } from "@/schema/zodSchemas";
import axiosInstance from "@/api/axiosConfig";
import { createFormDataDriverRequest } from "@/lib/CreateFormDataDriverRequest";
import { useNavigate } from "react-router-dom";
import CreateDriverForm from "@/components/forms/CreateDriverForm";
import { useLoja } from "@/context/LojaContext";
import { Button } from "@/components/ui/button";

type CreateDriverFormValues = z.infer<typeof CreateDriverSchema>;

export default function CreateDriverPage() {
	const navigate = useNavigate();
	const { loja } = useLoja();

	async function handleSubmit(values: CreateDriverFormValues) {
		try {
			const formData = createFormDataDriverRequest(values);
			formData.append("lojaId", String(loja?.id));

			const response = await axiosInstance.post("/api/entregador", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Entregador criado com sucesso!");
			console.log("Resposta da API:", response.data);
			setTimeout(() => navigate("/entregadores"), 300);
		} catch (error) {
			toast.error("Falha ao submeter o form, erro detalhado no console.");
			console.error("Erro ao submeter o form", error);
		}
	}

	return (
		<div className="bg-gray-50 min-h-screen p-8">
			<div className="w-full max-w-7xl relative mx-auto">
				<h1 className="text-3xl font-bold text-center mb-6">Criação de Entregador</h1>
				<Button
					onClick={() => navigate("/entregadores")}
					className="absolute left-0 top-0 flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
				>
					Voltar
				</Button>
			</div>
			<div className="mt-10">
				<CreateDriverForm onSubmit={handleSubmit} />
			</div>
		</div>
	);
}
