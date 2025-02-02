export interface Pedido {
	id: number;
	dataPedido: string;
	dataUltimaModificacao: string;
	status: string;
	valorTotal: number;
	taxaEntrega: number;
	formaPagamento: string;
	criadoPor: {
		firstName: string;
		lastName: string;
		phone: string;
	};
	enderecoEntrega: {
		rua: string;
		numero: string;
		bairro: string;
		cidade: string;
	};
	itens: [
		{
			quantidade: number;
			valorUnitario: number;
			item: {
				nome: string;
			};
		},
	];
	loja: {
		id: number;
		nome: string;
	};
  entregador: {
    id: number
    nome: string
    disponivel: boolean
  }
}

export interface EntregaFormData {
	pedidoId: number;
	senha: string;
}