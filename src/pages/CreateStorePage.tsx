import { toast } from "sonner";
import CreateStoreForm from "@/components/CreateStoreForm";
import useFetchSegmentos from "@/hooks/useFetchSegmentos";
import { z } from "zod";
import { CreateStoreSchema } from "@/schema/zodSchemas";

type CreateStoreFormValues = z.infer<typeof CreateStoreSchema>;

export default function CreateStorePage() {
	const { segmentos, loading } = useFetchSegmentos();

	function handleSubmit(values: CreateStoreFormValues) {
		try {
			// Placeholder por enquanto vou substituir quando implementar a lógica de latitude longitude
			console.log(values);
			toast(
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(values, null, 2)}</code>
				</pre>,
			);
		} catch (error) {
			console.error("Erro ao submeter o form", error);
			toast.error("Falha ao submeter o form, erro detalhado no console.");
		}
	}

	return (
		<div className="py-10">
			<CreateStoreForm segmentos={segmentos} loading={loading} onSubmit={handleSubmit} />
		</div>
	);
}
