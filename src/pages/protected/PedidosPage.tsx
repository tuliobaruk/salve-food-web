/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogAction,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import axiosInstance from "@/api/axiosConfig";
import { Notificacao } from "@/context/Notificacao";
import { toast } from "sonner";

export default function Pedidos() {
	const [pedidosPendentes, setPedidosPendentes] = useState([
		{
			id: 101,
			cliente: "João Silva",
			itens: [
				{ nome: "Hambúrguer", quantidade: 1 },
				{ nome: "Refrigerante", quantidade: 2 },
			],
		},
		{
			id: 102,
			cliente: "Maria Oliveira",
			itens: [
				{ nome: "Pizza", quantidade: 1 },
				{ nome: "Suco", quantidade: 1 },
			],
		},
		{
			id: 103,
			cliente: "Joaquim José",
			itens: [
				{ nome: "Pão Pizza Grande", quantidade: 3 },
				{ nome: "Batata Frita", quantidade: 2 },
				{ nome: "Coca Cola Zero", quantidade: 1 },
			],
		},
		{
			id: 104,
			cliente: "Melve Rossi",
			itens: [
				{ nome: "Cachorro-quente", quantidade: 1 },
				{ nome: "Batata Frita", quantidade: 1 },
			],
		},
		{
			id: 105,
			cliente: "Julio Cupim",
			itens: [
				{ nome: "Cachorro-quente", quantidade: 2 },
				{ nome: "Batata Frita", quantidade: 1 },
			],
		},
		{
			id: 106,
			cliente: "Senhor Madruga",
			itens: [
				{ nome: "Cachorro-quente", quantidade: 4 },
				{ nome: "Batata Frita", quantidade: 3 },
			],
		},
		{
			id: 107,
			cliente: "Rúbio Lins",
			itens: [
				{ nome: "Cachorro-quente", quantidade: 5 },
				{ nome: "Batata Frita", quantidade: 2 },
			],
		},
		{
			id: 108,
			cliente: "Patrício Poeto",
			itens: [
				{ nome: "Cachorro-quente", quantidade: 1 },
				{ nome: "Batata Frita", quantidade: 10 },
			],
		},
	]);
	const [pedidosAceitos, setPedidosAceitos] = useState<any[]>([]);
	const [pedidosAguardandoMotorista, setPedidosAguardandoMotorista] = useState<any[]>([]);
	const [modalPedido, setModalPedido] = useState<{ acao: string; pedido: any } | null>(null);
	const [rotinaNotificacao, setRotinaNotificacao] = useState<NodeJS.Timeout | null>(null);
	const [musica, setMusica] = useState<string | undefined>(undefined);
	const handleAcaoPedido = (acao: any, pedido: any) => {
		if (acao === "aceitar") {
			setPedidosAceitos((prev) => [...prev, pedido]);
			setPedidosPendentes((prev) => prev.filter((p) => p.id !== pedido.id));
		} else if (acao === "recusar") {
			setPedidosPendentes((prev) => prev.filter((p) => p.id !== pedido.id));
		}
		setModalPedido(null); // Fecha o modal após a ação
	};

	const handleFinalizarPedido = (pedido: any) => {
		setPedidosAceitos((prev) => prev.filter((p) => p.id !== pedido.id));
		setPedidosAguardandoMotorista((prev) => [...prev, pedido]);
		alert(`Pedido #${pedido.id} foi finalizado.`);
	};
	const defineMusica = async () => {
		setMusica((await axiosInstance.get("/api/loja/som")).data.link);
		console.log(musica);
	};
	const getMusica = async () => {
		if (musica) {
			return musica;
		} else {
			const resp = await axiosInstance.get("/api/loja/som");
			setMusica(resp.data.link);
			return resp.data.link;
		}
	};
	useEffect(() => {
		// Definir a música ao carregar a página
		defineMusica();
	}, []);

	const iniciarRotinaNotificacao = () => {
		if (rotinaNotificacao) {
			return;
		}

		setRotinaNotificacao(
			setInterval(async () => {
				const resp = await axiosInstance.get("/api/notifications");
				console.log("notifications");
				if (resp.data.length > 0) {
					if (musica) {
						const audio = new Audio(musica);
						audio.play();
					} else {
						const audio = new Audio(await getMusica());
						audio.play();
						console.log("musica era pra ta tocando agora não?");
					}
				}
				resp.data.forEach(async (notificacao: Notificacao) => {
					toast.info(
						`Pedido #${notificacao.pedidoId} de ${notificacao.senderName}: ${notificacao.message}`,
					);
					await axiosInstance.delete(`/api/notifications/${notificacao.id}`);
				});
			}, 5000),
		); // Intervalo de 5 segundos, ajuste conforme necessário
	};

	useEffect(() => {
		iniciarRotinaNotificacao();
	}, [musica]); // Adicione 'musica' como dependência para garantir que a rotina seja iniciada após a música ser definida

	return (
		<div className="bg-gray-100 min-h-screen p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">Gerenciamento de Pedidos</h1>

			{/* Grid com 3 colunas */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Coluna: Pedidos Pendentes */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Pedidos Pendentes</h2>
					<ul>
						{pedidosPendentes.map((pedido) => (
							<li key={pedido.id} className="flex justify-between items-center border-b py-2">
								<div>
									<p>
										<strong>Pedido #{pedido.id}</strong> - {pedido.cliente}
									</p>
									<ul className="text-gray-500 text-sm">
										{pedido.itens.map((item, index) => (
											<li key={index}>
												{item.quantidade} x {item.nome}
											</li>
										))}
									</ul>
								</div>
								<div className="flex gap-2">
									{/* Botão para aceitar */}
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<button
												onClick={() => setModalPedido({ acao: "aceitar", pedido })}
												className="bg-green-500 text-white px-3 py-1 rounded-md"
											>
												Aceitar
											</button>
										</AlertDialogTrigger>
										{modalPedido?.acao === "aceitar" && modalPedido?.pedido.id === pedido.id && (
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Confirmar Aceitação</AlertDialogTitle>
													<AlertDialogDescription>
														Tem certeza que deseja aceitar o pedido #{pedido.id} de {pedido.cliente}
														?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel onClick={() => setModalPedido(null)}>
														Cancelar
													</AlertDialogCancel>
													<AlertDialogAction onClick={() => handleAcaoPedido("aceitar", pedido)}>
														Confirmar
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										)}
									</AlertDialog>

									{/* Botão para recusar */}
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<button
												onClick={() => setModalPedido({ acao: "recusar", pedido })}
												className="bg-red-500 text-white px-3 py-1 rounded-md"
											>
												Recusar
											</button>
										</AlertDialogTrigger>
										{modalPedido?.acao === "recusar" && modalPedido?.pedido.id === pedido.id && (
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Confirmar Recusa</AlertDialogTitle>
													<AlertDialogDescription>
														Tem certeza que deseja recusar o pedido #{pedido.id} de {pedido.cliente}
														?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel onClick={() => setModalPedido(null)}>
														Cancelar
													</AlertDialogCancel>
													<AlertDialogAction onClick={() => handleAcaoPedido("recusar", pedido)}>
														Confirmar
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										)}
									</AlertDialog>
								</div>
							</li>
						))}
					</ul>
				</div>

				{/* Coluna: Pedidos Aceitos */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Pedidos Aceitos</h2>
					<ul>
						{pedidosAceitos.map((pedido) => (
							<li key={pedido.id} className="flex justify-between items-center border-b py-2">
								<div>
									<p>
										<strong>Pedido #{pedido.id}</strong> - {pedido.cliente}
									</p>
									<ul className="text-gray-500 text-sm">
										{pedido.itens.map((item: any, index: number) => (
											<li key={index}>
												{item.quantidade} x {item.nome}
											</li>
										))}
									</ul>
								</div>
								<div>
									<button
										onClick={() => handleFinalizarPedido(pedido)}
										className="bg-blue-500 text-white px-3 py-1 rounded-md"
									>
										Finalizar
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>

				{/* Coluna: Aguardando Motorista */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Aguardando Motorista</h2>
					<ul>
						{pedidosAguardandoMotorista.map((pedido) => (
							<li key={pedido.id} className="flex justify-between items-center border-b py-2">
								<div>
									<p>
										<strong>Pedido #{pedido.id}</strong> - {pedido.cliente}
									</p>
									<ul className="text-gray-500 text-sm">
										{pedido.itens.map((item: any, index: number) => (
											<li key={index}>
												{item.quantidade} x {item.nome}
											</li>
										))}
									</ul>
								</div>
								<div>
									<button
										onClick={() => alert(`Selecionar motorista para o pedido #${pedido.id}`)}
										className="bg-orange-500 text-white px-3 py-1 rounded-md"
									>
										Selecionar Motorista
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
