import { useState, useEffect } from "react";
import { useLoja } from "@/context/LojaContext"; // Importa o contexto da loja
import { getPedidos } from "@/api/PedidosServices";
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

export default function Pedidos() {
	const { loja } = useLoja(); // Obtém os dados da loja do usuário autenticado
	const [pedidosPendentes, setPedidosPendentes] = useState([]);
	const [pedidosAceitos, setPedidosAceitos] = useState([]);
	const [pedidosAguardandoMotorista, setPedidosAguardandoMotorista] = useState([]);
	const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
	const [acaoSelecionada, setAcaoSelecionada] = useState(null);

	// Buscar pedidos do backend ao carregar a página
	useEffect(() => {
		const carregarPedidos = async () => {
			try {
				const pedidos = await getPedidos();
				
				// Filtrar pedidos apenas da loja logada
				const pedidosDaLoja = pedidos.filter(pedido => pedido.loja.id === loja?.id);
				setPedidosPendentes(pedidosDaLoja);
			} catch (error) {
				console.error("Erro ao carregar pedidos: ", error);
			}
		};
		if (loja) {
			carregarPedidos();
		}
	}, [loja]);

	const handleAcaoPedido = (acao, pedido) => {
		if (acao === "aceitar") {
			setPedidosAceitos((prev) => [...prev, pedido]);
			setPedidosPendentes((prev) => prev.filter((p) => p.id !== pedido.id));
		} else if (acao === "recusar") {
			setPedidosPendentes((prev) => prev.filter((p) => p.id !== pedido.id));
		}
		setPedidoSelecionado(null); // Fecha o modal após a ação
	};

	const handleFinalizarPedido = (pedido) => {
		setPedidosAceitos((prev) => prev.filter((p) => p.id !== pedido.id));
		setPedidosAguardandoMotorista((prev) => [...prev, pedido]);
		alert(`Pedido #${pedido.id} foi finalizado.`);
	};

	if (!loja) {
		return <p className="text-center text-red-500">Erro: Nenhuma loja associada ao usuário.</p>;
	}

	return (
		<div className="bg-gray-100 min-h-screen p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">Gerenciamento de Pedidos</h1>

			{/* Grid com 3 colunas */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Coluna: Pedidos Pendentes */}
				<div className="bg-white shadow p-4 rounded-md">
					<h2 className="text-lg font-bold mb-4 text-center">Pedidos Pendentes</h2>
					<ul>
						{pedidosPendentes.length > 0 ? pedidosPendentes.map((pedido) => (
							<li key={pedido.id} className="flex justify-between items-center border-b py-2">
								<div>
									<p>
										<strong>Pedido #{pedido.id}</strong> - {pedido.criadoPor.firstName + ' ' + pedido.criadoPor.lastName}
									</p>
									<ul className="text-gray-500 text-sm">
										{pedido.itens.map((item, index) => (
											<li key={index}>
												{item.quantidade} x {item.item.nome || "Produto sem nome"}
											</li>
										))}
									</ul>
								</div>
								<div className="flex gap-2">
									{/* Botão para aceitar */}
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<button
												onClick={() => {
													setPedidoSelecionado(pedido);
													setAcaoSelecionada("aceitar");
												}}
												className="bg-green-500 text-white px-3 py-1 rounded-md"
											>
												Aceitar
											</button>
										</AlertDialogTrigger>
										{pedidoSelecionado && acaoSelecionada === "aceitar" && (
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Confirmar Aceitação</AlertDialogTitle>
													<AlertDialogDescription>
														Tem certeza que deseja aceitar o pedido #{pedido.id} de {pedido.cliente}?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel onClick={() => setPedidoSelecionado(null)}>
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
												onClick={() => {
													setPedidoSelecionado(pedido);
													setAcaoSelecionada("recusar");
												}}
												className="bg-red-500 text-white px-3 py-1 rounded-md"
											>
												Recusar
											</button>
										</AlertDialogTrigger>
										{pedidoSelecionado && acaoSelecionada === "recusar" && (
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Confirmar Recusa</AlertDialogTitle>
													<AlertDialogDescription>
														Tem certeza que deseja recusar o pedido #{pedido.id} de {pedido.cliente}?
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel onClick={() => setPedidoSelecionado(null)}>
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
						)) : <p className="text-center text-gray-500">Nenhum pedido pendente.</p>}
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
									<strong>Pedido #{pedido.id}</strong> - {pedido.criadoPor.firstName + ' ' + pedido.criadoPor.lastName}
									</p>
									<ul className="text-gray-500 text-sm">
										{pedido.itens.map((item, index) => (
											<li key={index}>
												{item.quantidade} x {item.item.nome}
											</li>
										))}
									</ul>
								</div>
								<button
									onClick={() => handleFinalizarPedido(pedido)}
									className="bg-blue-500 text-white px-3 py-1 rounded-md"
								>
									Finalizar
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
