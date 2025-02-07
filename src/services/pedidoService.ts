import axiosInstance from "@/api/axiosConfig";

export const fetchTodosPedidos = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/pedidos/loja`,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw new Error("Não foi possível carregar os pedidos.");
  }
}

export const fetchPedidoData = async (status: string, page: number = 0, size: number = 5) => {
	try {
		const response = await axiosInstance.get(
			`/api/pedidos/loja/status/${status}?page=${page}&size=${size}`,
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar dados do pedido:", error);
		throw new Error("Não foi possível carregar os dados do pedido.");
	}
};

export const buscarEntregadores = async () => {
	try {
		const response = await axiosInstance.get(`/api/entregador/meus`);
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar entregadores:", error);
		throw new Error("Não foi possível buscar os entregadores.");
	}
};

export const alterarStatusEntregador = async (entregadorId: number, disponivel: boolean) => {
	try {
		const response = await axiosInstance.patch(
			`/api/entregador/${entregadorId}/status?disponivel=${disponivel}`,
			{},
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao alterar status do entregador:", error);
		throw new Error("Não foi possível alterar o status do entregador.");
	}
};

export const aceitarPedido = async (pedidoId: number) => {
	try {
		const response = await axiosInstance.put(`/api/pedidos/${pedidoId}/preparando`, {});
		return response.data;
	} catch (error) {
		console.error("Erro ao aceitar pedido:", error);
		throw new Error("Não foi possível aceitar o pedido.");
	}
};

export const pedidoEntregue = async (pedidoId: number, entregadorId: number, senha: string) => {
	try {
		const response = await axiosInstance.put(`/api/pedidos/${pedidoId}/entregue`, {
			idEntregador: entregadorId,
			senha,
		});
		return response.data;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw error.response.data.error;
	}
};

export const pedidoCancelado = async (pedidoId: number) => {
	try {
		const response = await axiosInstance.put(`/api/pedidos/${pedidoId}/cancelado`, {});
		return response.data;
	} catch (error) {
		console.error("Erro ao cancelar pedido:", error);
		throw new Error("Não foi possível cancelar o pedido.");
	}
};

export const aguardandoEntregador = async (pedidoId: number) => {
	try {
		const response = await axiosInstance.put(`/api/pedidos/${pedidoId}/aguardando-entregador`, {});
		return response.data;
	} catch (error) {
		console.error("Erro ao aguardar entregador:", error);
		throw new Error("Não foi possível aguardar o entregador.");
	}
};

export const definirEntregador = async (pedidoId: number, entregadorId: number) => {
	try {
		const response = await axiosInstance.put(
			`/api/pedidos/${pedidoId}/entregador/${entregadorId}`,
			{
				entregadorId,
			},
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao definir entregador:", error);
		throw new Error("Não foi possível definir o entregador.");
	}
};
