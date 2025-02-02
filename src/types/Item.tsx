export interface CategoriaItem {
	id: number;
	nome: string;
}

export interface Item {
	id: number;
	nome: string;
	descricao: string;
	valor: number;
	itemImage: string;
	categoriaItem: CategoriaItem;
}
