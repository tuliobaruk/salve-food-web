import { useLoja } from "@/context/LojaContext";
import { fetchLojaData } from "@/services/lojaService";
import { useEffect, useState } from "react";

export default function Dashboard() {
	const { setLoja, loja } = useLoja();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const inicializarLoja = async () => {
			try {
				if (!loja) {
					const lojaData = await fetchLojaData();
					setLoja(lojaData);
				}
			} catch (error) {
				console.error("Erro ao carregar os dados da loja:", error);
			} finally {
				setLoading(false);
			}
		};

		inicializarLoja();
	}, [loja, setLoja]);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p>Carregando...</p>
			</div>
		);
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<h1>Bem-vindo ao Dashboard</h1>
				{loja && (
					<div>
						<h2>Loja Id: {loja.id}</h2>
						<h2>Nome: {loja.nome}</h2>
						<p>Descrição: {loja.descricao}</p>
						<p>
							Endereço: {loja.rua}, {loja.numero} - {loja.bairro}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
