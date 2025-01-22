import { useState } from "react";
import Header from "@/components/ui/Header";
export default function Dashboard() {
	//Exemplo de pedidos
	const [pedidosPendentes, setPedidosPendentes] = useState([
		{ id: 101, cliente: "João Silva", itens: ["Hambúrguer", "Refrigerante"] },
		{ id: 102, cliente: "Maria Oliveira", itens: ["Pizza", "Suco"] },
		{ id: 103, cliente: "Carlos Santos", itens: ["Cachorro-quente", "Batata Frita"] },
	]);
	const [pedidosAceitos, setPedidosAceitos] = useState([]);
	const [pedidosFinalizados, setPedidosFinalizados] = useState([]);

	// Estado do modal de aceite de pedido
	const [modal, setModal] = useState({
		isVisible: false,
		action: null,
		pedido: null,
	});

	// Função para abrir o modal de aceitar/negar
	const openModal = (action, pedido) => {
		setModal({ isVisible: true, action, pedido });
	};

	// Função para fechar o modal de aceitar/negar
	const closeModal = () => {
		setModal({ isVisible: false, action: null, pedido: null });
	};

	// Função para confirmar a ação no modal
	const confirmAction = () => {
		const { action, pedido } = modal;
		if (action === "aceitar") {
			setPedidosPendentes(pedidosPendentes.filter((p) => p.id !== pedido.id));
			setPedidosAceitos([...pedidosAceitos, { ...pedido, status: "Aceito" }]);
		} else if (action === "recusar") {
			setPedidosPendentes(pedidosPendentes.filter((p) => p.id !== pedido.id));
		} else if (action === "finalizar") {
			setPedidosAceitos(pedidosAceitos.filter((p) => p.id !== pedido.id));
			setPedidosFinalizados([
				...pedidosFinalizados,
				{ ...pedido, status: "Finalizado", finalizadoEm: new Date().toLocaleTimeString() },
			]);
		}
		closeModal();
	};

	return (
		<div className="bg-gray-100 min-h-screen p-4">
			{/* Header component (Poderá ser aplicado globalmente) */}
			<Header />

			{/* Modal de Confirmação */}
			{modal.isVisible && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-md shadow-lg p-6 w-96">
						<h2 className="text-lg font-bold mb-4">Confirmar Ação</h2>
						<p className="text-gray-700 mb-4">
							Tem certeza que deseja {modal.action} o pedido <strong>#{modal.pedido.id}</strong> de{" "}
							{modal.pedido.cliente}?
						</p>
						<div className="flex justify-end">
							<button
								onClick={closeModal}
								className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
							>
								Cancelar
							</button>
							<button
								onClick={confirmAction}
								className="bg-blue-500 text-white px-4 py-2 rounded-md"
							>
								Confirmar
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Pedidos Pendentes */}
			<div className="bg-white shadow p-4 rounded-md mt-6">
				<h2 className="text-lg font-bold mb-4">Pedidos Pendentes</h2>
				<ul>
					{pedidosPendentes.length > 0 ? (
						pedidosPendentes.map((pedido) => (
							<li key={pedido.id} className="flex justify-between items-center border-b py-2">
								<div>
									<p>
										<strong>Pedido #{pedido.id}</strong> - {pedido.cliente}
									</p>
									<p className="text-gray-500 text-sm">{pedido.itens.join(", ")}</p>
								</div>
								<div>
									<button
										onClick={() => openModal("aceitar", pedido)}
										className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
									>
										Aceitar
									</button>
									<button
										onClick={() => openModal("recusar", pedido)}
										className="bg-red-500 text-white px-3 py-1 rounded-md"
									>
										Recusar
									</button>
								</div>
							</li>
						))
					) : (
						<p className="text-gray-500">Nenhum pedido pendente no momento.</p>
					)}
				</ul>
			</div>

			{/* Pedidos Aceitos */}
			<div className="bg-white shadow p-4 rounded-md mt-6">
				<h2 className="text-lg font-bold mb-4">Pedidos Aceitos</h2>
				<ul>
					{pedidosAceitos.length > 0 ? (
						pedidosAceitos.map((pedido) => (
							<li key={pedido.id} className="flex justify-between items-center border-b py-2">
								<div>
									<p>
										<strong>Pedido #{pedido.id}</strong> - {pedido.cliente}
									</p>
									<p className="text-gray-500 text-sm">{pedido.itens.join(", ")}</p>
								</div>
								<button
									onClick={() => openModal("finalizar", pedido)}
									className="bg-blue-500 text-white px-3 py-1 rounded-md"
								>
									Finalizar
								</button>
							</li>
						))
					) : (
						<p className="text-gray-500">Nenhum pedido aceito no momento.</p>
					)}
				</ul>
			</div>

			{/* Últimos Pedidos Finalizados */}
			<div className="bg-white shadow p-4 rounded-md mt-6">
				<h2 className="text-lg font-bold mb-4">Últimos Pedidos Finalizados</h2>
				<ul>
					{pedidosFinalizados.length > 0 ? (
						pedidosFinalizados.map((pedido) => (
							<li key={pedido.id} className="border-b py-2">
								<div className="flex justify-between items-center">
									<div>
										<p>
											<strong>Pedido #{pedido.id}</strong> - {pedido.cliente}
										</p>
										<p className="text-gray-500 text-sm">
											{pedido.itens.join(", ")} -{" "}
											<span className="font-semibold">{pedido.status}</span>
										</p>
									</div>
									<span className="text-gray-400 text-sm">Finalizado às {pedido.finalizadoEm}</span>
								</div>
							</li>
						))
					) : (
						<p className="text-gray-500">Nenhum pedido finalizado ainda.</p>
					)}
				</ul>
			</div>
		</div>
	);
}
