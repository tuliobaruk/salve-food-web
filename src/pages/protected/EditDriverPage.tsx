import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosConfig";
import EditDriverForm from "@/components/forms/EditDriverForm";
import { useLoja } from "@/context/LojaContext";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { CreateDriverSchema } from "@/schema/zodSchemas";
import { Loading } from "@/components/Loading";
import { createFormDataDriverRequest } from "@/lib/CreateFormDataDriverRequest";

type EditDriverFormValues = z.infer<typeof CreateDriverSchema>;

export default function EditDriverPage() {
	const { id } = useParams();
	const { loja } = useLoja();
	const navigate = useNavigate();

	const [driver, setDriver] = useState<{
		nome: string;
		image: string;
	} | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchDriver() {
			try {
				const response = await axiosInstance.get(`/api/entregador/unico/${id}`, {
					params: { id },
				});

				const fetchedItem = response.data;

				setDriver({
					nome: fetchedItem.nome,
					image: fetchedItem.image,
				});

				setLoading(false);
			} catch (error) {
				toast.error("Erro ao carregar dados do entregador.");
				console.error("Erro ao buscar entregador:", error);
				navigate("/entregadores");
			}
		}

		if (id) fetchDriver();
	}, [id, navigate]);

	async function handleSubmit(values: EditDriverFormValues) {
		try {
			const formData = createFormDataDriverRequest(values);
			formData.append("lojaId", String(loja?.id));

			await axiosInstance.put(`/api/entregador/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Entregador atualizado com sucesso!");
			setTimeout(() => navigate("/entregadores"), 300);
		} catch (error) {
			toast.error("Falha ao atualizar o entregador.");
			console.error("Erro ao submeter o formulário:", error);
		}
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="bg-gray-50 min-h-screen p-8">
			<div className="w-full max-w-7xl relative mx-auto">
				<h1 className="text-3xl font-bold text-center mb-6">Edição de Entregador</h1>
				<Button
					onClick={() => navigate("/entregadores")}
					className="absolute left-0 top-0 flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
				>
					Voltar
				</Button>
			</div>
			<div className="mt-10">
				{driver && <EditDriverForm driver={driver} onSubmit={handleSubmit} />}
			</div>
		</div>
	);
}
