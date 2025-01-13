import { useState } from "react";
import axios from "@/api/axiosConfig";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TestIntrospectButton() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleIntrospect = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get("/api/auth/introspect");
			console.log(response.data);
			toast.success("Rota introspect retornada com sucesso! Olhe o console");
		} catch (err) {
			console.error(err);
			setError("Falha ao fazer introspect");
			toast.error("Erro ao acessar a rota introspect");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Button onClick={handleIntrospect} disabled={loading}>
				{loading ? "Carregando..." : "Testar Rota Introspect"}
			</Button>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
}
