/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	aceitarPedido,
	aguardandoEntregador,
	alterarStatusEntregador,
	buscarEntregadores,
	definirEntregador,
	fetchPedidoData,
	pedidoCancelado,
	pedidoEntregue,
} from "@/services/pedidoService";
import { Entregador } from "@/types/Entregador";
import { EntregaFormData, Pedido } from "@/types/Pedido";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosConfig";
import { Notificacao } from "@/types/Notificacao";

export default function Pedidos() {
	const [pedidosPendentes, setPedidosPendentes] = useState<Pedido[]>([]);
	const [pedidosAceitos, setPedidosAceitos] = useState<Pedido[]>([]);
	const [pedidosAguardandoMotorista, setPedidosAguardandoMotorista] = useState<Pedido[]>([]);
	const [modalPedido, setModalPedido] = useState<{ acao: string; pedido: Pedido } | null>(null);
	const [rotinaNotificacao, setRotinaNotificacao] = useState<NodeJS.Timeout | null>(null);
	const [musica, setMusica] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const [showEntregaModal, setShowEntregaModal] = useState(false);
	const [entregaForm, setEntregaForm] = useState<EntregaFormData>({
		pedidoId: 0,
		senha: "",
	});
	const [entregadores, setEntregadores] = useState<Entregador[]>([]);
	const [selectedEntregador, setSelectedEntregador] = useState<string>("");
	const [loadingEntregadores, setLoadingEntregadores] = useState(false);
	const [pedidosACaminho, setPedidosACaminho] = useState<any[]>([]);
	const [paginationState, setPaginationState] = useState({
		pendentes: { currentPage: 0, totalPages: 0 },
		aceitos: { currentPage: 0, totalPages: 0 },
		aguardando: { currentPage: 0, totalPages: 0 },
		aCaminho: { currentPage: 0, totalPages: 0 },
	});

	const handleFetchPedido = async (status: string, page: number) => {
		try {
			setLoading(true);
			const response = await fetchPedidoData(status, page);
			return response;
		} catch (error: any) {
			toast.error(error.details);
			return null;
		}
	};

	const fetchAllColumns = async () => {
		try {
			setLoading(true);

			const [pendenteResponse, aceitosResponse, aguardandoResponse, aCaminhoResponse] =
				await Promise.all([
					handleFetchPedido("PENDENTE", paginationState.pendentes.currentPage),
					handleFetchPedido("PREPARANDO", paginationState.aceitos.currentPage),
					handleFetchPedido("AGUARDANDO_ENTREGADOR", paginationState.aguardando.currentPage),
					handleFetchPedido("A_CAMINHO", paginationState.aCaminho.currentPage),
				]);

			if (pendenteResponse) {
				setPedidosPendentes(pendenteResponse.content);
				setPaginationState((prev) => ({
					...prev,
					pendentes: {
						...prev.pendentes,
						totalPages: pendenteResponse.totalPages,
					},
				}));
			}

			if (aceitosResponse) {
				setPedidosAceitos(aceitosResponse.content);
				setPaginationState((prev) => ({
					...prev,
					aceitos: {
						...prev.aceitos,
						totalPages: aceitosResponse.totalPages,
					},
				}));
			}

			if (aguardandoResponse) {
				setPedidosAguardandoMotorista(aguardandoResponse.content);
				setPaginationState((prev) => ({
					...prev,
					aguardando: {
						...prev.aguardando,
						totalPages: aguardandoResponse.totalPages,
					},
				}));
			}

			if (aCaminhoResponse) {
				setPedidosACaminho(aCaminhoResponse.content);
				setPaginationState((prev) => ({
					...prev,
					aCaminho: {
						...prev.aCaminho,
						totalPages: aCaminhoResponse.totalPages,
					},
				}));
			}
		} catch (error: any) {
			toast.error(error.details);
		} finally {
			setLoading(false);
		}
	};

	const carregarEntregadores = async () => {
		try {
			setLoadingEntregadores(true);
			const response = await buscarEntregadores();
			setEntregadores(response);
		} catch (error: any) {
			toast.error(error.details);
		} finally {
			setLoadingEntregadores(false);
		}
	};

	const handleAcaoPedido = async (acao: string, pedido: Pedido) => {
		try {
			setLoading(true);
			if (acao === "aceitar") {
				await aceitarPedido(pedido.id);
				toast.success(`Pedido #${pedido.id} aceito com sucesso`);
			} else if (acao === "recusar") {
				await pedidoCancelado(pedido.id);
				toast.success(`Pedido #${pedido.id} recusado`);
			}
			await fetchAllColumns();
		} catch (error) {
			toast.error(`Erro ao ${acao === "aceitar" ? "aceitar" : "recusar"} o pedido`);
		} finally {
			setLoading(false);
			setModalPedido(null);
		}
	};

	const handlePedidoPronto = async (pedido: Pedido) => {
		try {
			setLoading(true);
			await aguardandoEntregador(pedido.id);
			setPedidosAceitos((prev) => prev.filter((p) => p.id !== pedido.id));
			setPedidosAguardandoMotorista((prev) => [...prev, pedido]);
			toast.success(`Pedido #${pedido.id} finalizado e aguardando entregador`);
		} catch (error:any) {
			toast.error("Erro ao finalizar pedido");
		} finally {
			setLoading(false);
		}
	};

	const handleSelecionarEntregador = async (pedido: Pedido, entregadorId: string) => {
		try {
			setLoading(true);
			await definirEntregador(pedido.id, Number(entregadorId));
			await alterarStatusEntregador(Number(entregadorId), false);
			await carregarEntregadores();

			setPedidosAguardandoMotorista((prev) => prev.filter((p) => p.id !== pedido.id));
			setPedidosACaminho((prev) => [...prev, { ...pedido, status: "A_CAMINHO" }]);

			toast.success(`Entregador definido para o pedido #${pedido.id}`);
			setSelectedEntregador("");
		} catch (error: any) {
			toast.error(error.details);
		} finally {
			setLoading(false);
		}
	};

	const handleConfirmarEntrega = async () => {
		try {
			setLoading(true);
			const { pedidoId, senha } = entregaForm;

			const pedidoAtual = pedidosACaminho.find((p) => p.id === pedidoId);

			if (!pedidoAtual || !pedidoAtual.entregador) {
				toast.error("Pedido não encontrado ou entregador não definido");
				return;
			}

			await pedidoEntregue(pedidoId, pedidoAtual.entregador.id, senha);
			await alterarStatusEntregador(pedidoAtual.entregador.id, true);
			await carregarEntregadores();

			setPedidosACaminho((prev) =>
				prev.map((p) => (p.id === pedidoId ? { ...p, status: "ENTREGUE" } : p)),
			);

			toast.success(`Pedido #${pedidoId} entregue com sucesso`);
			await fetchAllColumns();
			setShowEntregaModal(false);
			setEntregaForm({ pedidoId: 0, senha: "" });
		} catch (error: any) {
			toast.error(error.details);
			console.error("Erro detalhado:", error);
		} finally {
			setLoading(false);
		}
	};

	const getNomeCliente = (pedido: Pedido) => {
		return `${pedido.criadoPor.firstName} ${pedido.criadoPor.lastName}`;
	};

	const defineMusica = async () => {
		setMusica((await axiosInstance.get("/api/loja/som")).data.link);
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

	const iniciarRotinaNotificacao = () => {
		if (rotinaNotificacao) {
			clearInterval(rotinaNotificacao);
		}

		const novaRotina = setInterval(async () => {
			try {
				const resp = await axiosInstance.get("/api/notifications");

				if (resp.data.length > 0) {
					if (musica) {
						const audio = new Audio(musica);
						audio.play();
					} else {
						try{
							const audio = new Audio(await getMusica());
							audio.play();

						}catch(error:any){
							console.error("Erro ao tocar música:", error.details);
						}
					}

					let notificacao: Notificacao;
					for (notificacao of resp.data) {
						toast.info(
							`Pedido #${notificacao.pedidoId} de ${notificacao.senderName}: ${notificacao.message}`,
						);
						await axiosInstance.delete(`/api/notifications/${notificacao.id}`);
					}
				}
				await fetchAllColumns();
			} catch (error) {
				console.error("Erro na rotina de notificação:", error);
			}
		}, 5000);

		setRotinaNotificacao(novaRotina);
	};

	const handleColumnPageChange = async (
		column: "pendentes" | "aceitos" | "aguardando" | "aCaminho",
		newPage: number,
	) => {
		const totalPages = paginationState[column].totalPages;
		if (newPage < 0 || newPage >= totalPages) {
			return;
		}

		setPaginationState((prev) => ({
			...prev,
			[column]: {
				...prev[column],
				currentPage: newPage,
			},
		}));

		const statusMap = {
			pendentes: "PENDENTE",
			aceitos: "PREPARANDO",
			aguardando: "AGUARDANDO_ENTREGADOR",
			aCaminho: "A_CAMINHO",
		};

		const response = await handleFetchPedido(statusMap[column], newPage);
		if (response) {
			switch (column) {
				case "pendentes":
					await fetchAllColumns();
					setPedidosPendentes(response.content);
					break;
				case "aceitos":
					await fetchAllColumns();
					setPedidosAceitos(response.content);
					break;
				case "aguardando":
					await fetchAllColumns();
					setPedidosAguardandoMotorista(response.content);
					break;
				case "aCaminho":
					await fetchAllColumns();
					setPedidosACaminho(response.content);
					break;
			}
		}
	};

	useEffect(() => {
		fetchAllColumns();
		defineMusica();
		carregarEntregadores();

		return () => {
			if (rotinaNotificacao) {
				clearInterval(rotinaNotificacao);
			}
		};
	}, []);

	useEffect(() => {
		iniciarRotinaNotificacao();
		return () => {
			if (rotinaNotificacao) {
				clearInterval(rotinaNotificacao);
			}
		};
	}, [musica]);

	const abrirModalEntrega = (pedido: Pedido) => {
		if (pedido.status === "A_CAMINHO") {
			setEntregaForm({
				pedidoId: pedido.id,
				senha: "",
			});
			setShowEntregaModal(true);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Gerenciamento de Pedidos</h1>
				<button
					onClick={() => handleFetchPedido("PENDENTE", paginationState.pendentes.currentPage)}
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
					disabled={loading}
				>
					Atualizar Pedidos
				</button>
			</div>

			{/* Modal de Entrega */}
			<Dialog open={showEntregaModal} onOpenChange={setShowEntregaModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar Entrega do Pedido #{entregaForm.pedidoId}</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="senha">Senha do Pedido</Label>
							<Input
								id="senha"
								type="text"
								value={entregaForm.senha}
								onChange={(e) => setEntregaForm((prev) => ({ ...prev, senha: e.target.value }))}
								placeholder="Digite a senha do pedido"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								setShowEntregaModal(false);
								setEntregaForm({ pedidoId: 0, senha: "" });
							}}
						>
							Cancelar
						</Button>
						<Button onClick={handleConfirmarEntrega} disabled={loading || !entregaForm.senha}>
							Confirmar Entrega
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				{/* Coluna: Pedidos Pendentes */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Pedidos Pendentes</h2>
					<ul className="space-y-4">
						{pedidosPendentes.map((pedido: Pedido) => (
							<li key={pedido.id} className="border rounded-lg p-4">
								<div className="flex justify-between items-start mb-2">
									<div>
										<p className="font-bold">Pedido #{pedido.id}</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Cliente: </span>
											{getNomeCliente(pedido)}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Contato: </span>
											{pedido.criadoPor.phone}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Data: </span>
											{pedido.dataPedido}
										</p>
									</div>
									<p className="text-right font-bold">R$ {pedido.valorTotal.toFixed(2)}</p>
								</div>

								<div className="mt-2">
									<p className="text-sm font-semibold">Itens:</p>
									<ul className="text-sm text-gray-600">
										{pedido.itens.map((item, index) => (
											<li key={index}>
												{item.quantidade}x {item.item.nome} - R${" "}
												{(item.quantidade * item.valorUnitario).toFixed(2)}
											</li>
										))}
									</ul>
								</div>

								<div className="mt-3 flex justify-end gap-2">
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<button
												onClick={() => setModalPedido({ acao: "aceitar", pedido })}
												className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
												disabled={loading}
											>
												Aceitar
											</button>
										</AlertDialogTrigger>
										{modalPedido?.acao === "aceitar" && modalPedido?.pedido.id === pedido.id && (
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Confirmar Aceitação</AlertDialogTitle>
													<AlertDialogDescription>
														Tem certeza que deseja aceitar o pedido #{pedido.id} de{" "}
														{getNomeCliente(pedido)}?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel onClick={() => setModalPedido(null)}>
														Cancelar
													</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleAcaoPedido("aceitar", pedido)}
														disabled={loading}
													>
														Confirmar
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										)}
									</AlertDialog>

									<AlertDialog>
										<AlertDialogTrigger asChild>
											<button
												onClick={() => setModalPedido({ acao: "recusar", pedido })}
												className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
												disabled={loading}
											>
												Recusar
											</button>
										</AlertDialogTrigger>
										{modalPedido?.acao === "recusar" && modalPedido?.pedido.id === pedido.id && (
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Confirmar Recusa</AlertDialogTitle>
													<AlertDialogDescription>
														Tem certeza que deseja recusar o pedido #{pedido.id} de{" "}
														{getNomeCliente(pedido)}?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel onClick={() => setModalPedido(null)}>
														Cancelar
													</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => handleAcaoPedido("recusar", pedido)}
														disabled={loading}
													>
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
					{pedidosPendentes.length === 0 && (
						<p className="text-center text-gray-500">Nenhum pedido pendente</p>
					)}
					<div className="mt-4">
						<Pagination
							currentPage={paginationState.pendentes.currentPage}
							totalPages={paginationState.pendentes.totalPages}
							onPageChange={(page) => handleColumnPageChange("pendentes", page)}
						/>
					</div>
				</div>

				{/* Coluna: Pedidos Aceitos */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Pedidos Aceitos</h2>
					<ul className="space-y-4">
						{pedidosAceitos.map((pedido) => (
							<li key={pedido.id} className="border rounded-lg p-4">
								<div className="flex justify-between items-start mb-2">
									<div>
										<p className="font-bold">Pedido #{pedido.id}</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Cliente: </span>
											{getNomeCliente(pedido)}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Contato: </span>
											{pedido.criadoPor.phone}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Data: </span>
											{pedido.dataPedido}
										</p>
									</div>
									<p className="text-right font-bold">R$ {pedido.valorTotal.toFixed(2)}</p>
								</div>

								<div className="mt-2">
									<p className="text-sm font-semibold">Itens:</p>
									<ul className="text-sm text-gray-600">
										{pedido.itens.map((item: any, index: number) => (
											<li key={index}>
												{item.quantidade}x {item.item.nome} - R${" "}
												{(item.quantidade * item.valorUnitario).toFixed(2)}
											</li>
										))}
									</ul>
								</div>

								<div className="mt-3 flex justify-end">
									<button
										onClick={() => handlePedidoPronto(pedido)}
										className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
										disabled={loading}
									>
										Pedido Pronto
									</button>
								</div>
							</li>
						))}
					</ul>
					{pedidosAceitos.length === 0 && (
						<p className="text-center text-gray-500">Nenhum pedido em preparo</p>
					)}
					<div className="mt-4">
						<Pagination
							currentPage={paginationState.aceitos.currentPage}
							totalPages={paginationState.aceitos.totalPages}
							onPageChange={(page) => handleColumnPageChange("aceitos", page)}
						/>
					</div>
				</div>

				{/* Coluna: Aguardando Motorista */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Aguardando Entregador</h2>
					<ul className="space-y-4">
						{pedidosAguardandoMotorista.map((pedido: Pedido) => (
							<li key={pedido.id} className="border rounded-lg p-4">
								<div className="flex justify-between items-start mb-2">
									<div>
										<p className="font-bold">Pedido #{pedido.id}</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Cliente: </span>
											{getNomeCliente(pedido)}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Contato: </span>
											{pedido.criadoPor.phone}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Data: </span>
											{pedido.dataPedido}
										</p>
									</div>
									<p className="text-right font-bold">R$ {pedido.valorTotal.toFixed(2)}</p>
								</div>

								<div className="mt-2">
									<p className="text-sm font-semibold">Itens:</p>
									<ul className="text-sm text-gray-600">
										{pedido.itens.map((item: any, index: number) => (
											<li key={index}>
												{item.quantidade}x {item.item.nome} - R${" "}
												{(item.quantidade * item.valorUnitario).toFixed(2)}
											</li>
										))}
									</ul>
								</div>

								<div className="mt-3">
									<Select
										value={selectedEntregador}
										onValueChange={(value) => handleSelecionarEntregador(pedido, value)}
										disabled={loading || loadingEntregadores}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecionar entregador" />
										</SelectTrigger>
										<SelectContent>
											{entregadores
												.filter((entregador) => entregador.disponivel)
												.map((entregador) => (
													<SelectItem
														key={entregador.id}
														value={entregador.id.toString()}
														className="flex items-center gap-2 p-2"
													>
														<div className="flex items-center gap-2">
															<img
																src={entregador.image}
																alt={entregador.nome}
																className="w-8 h-8 rounded-full object-cover"
															/>
															<span>{entregador.nome}</span>
														</div>
													</SelectItem>
												))}
										</SelectContent>
									</Select>
								</div>
							</li>
						))}
					</ul>
					{pedidosAguardandoMotorista.length === 0 && (
						<p className="text-center text-gray-500">Nenhum pedido aguardando motorista</p>
					)}
					<div className="mt-4">
						<Pagination
							currentPage={paginationState.aguardando.currentPage}
							totalPages={paginationState.aguardando.totalPages}
							onPageChange={(page) => handleColumnPageChange("aguardando", page)}
						/>
					</div>
				</div>

				{/* Coluna: Pedido a caminho */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Pedido a caminho</h2>
					<ul className="space-y-4">
						{pedidosACaminho.map((pedido: Pedido) => (
							<li
								key={pedido.id}
								className={"border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"}
								onClick={() => abrirModalEntrega(pedido)}
							>
								<div className="flex justify-between items-start mb-2">
									<div>
										<p className="font-bold">Pedido #{pedido.id}</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Cliente: </span>
											{getNomeCliente(pedido)}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Contato: </span>
											{pedido.criadoPor.phone}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Data: </span> {pedido.dataPedido}
										</p>
										<p className="text-sm text-gray-600">
											<span className="text-sm font-semibold">Entregador: </span>
											{pedido.entregador?.nome || "indefinido"}
										</p>
									</div>
									<p className="text-right font-bold">R$ {pedido.valorTotal.toFixed(2)}</p>
								</div>

								<div className="mt-2">
									<p className="text-sm font-semibold">Itens:</p>
									<ul className="text-sm text-gray-600">
										{pedido.itens.map((item: any, index: number) => (
											<li key={index}>
												{item.quantidade}x {item.item.nome} - R${" "}
												{(item.quantidade * item.valorUnitario).toFixed(2)}
											</li>
										))}
									</ul>
								</div>
							</li>
						))}
					</ul>
					{pedidosACaminho.length === 0 && (
						<p className="text-center text-gray-500">Nenhum pedido a caminho ou Finalizado</p>
					)}
					<div className="mt-4">
						<Pagination
							currentPage={paginationState.aCaminho.currentPage}
							totalPages={paginationState.aCaminho.totalPages}
							onPageChange={(page) => handleColumnPageChange("aCaminho", page)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
