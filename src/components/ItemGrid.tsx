import { CardItem } from "@/components/CardItem";

interface CategoriaItem {
	id: number;
	nome: string;
}

interface Item {
	id: number;
	nome: string;
	descricao: string;
	valor: number;
	itemImage: string;
	categoriaItem: CategoriaItem;
}

interface ItemGridProps {
	items: Item[];
	onEdit: (itemId: number) => void;
	onRemove: (itemId: number) => void;
}

export function ItemGrid({ items, onEdit, onRemove }: ItemGridProps) {
	if (items.length === 0) {
		return <p className="text-center text-lg text-gray-500">Nenhum item encontrado.</p>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{items.map((item) => (
				<CardItem key={item.id} item={item} onEdit={onEdit} onRemove={onRemove} />
			))}
		</div>
	);
}
