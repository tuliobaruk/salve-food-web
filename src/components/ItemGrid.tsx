import { CardItem } from "@/components/CardItem";
import { Item } from "@/types/Item";

interface ItemGridProps {
	items: Item[];
	onEdit: (itemId: number) => void;
	onRemove: (itemId: number) => void;
	onAvailability: (itemId: number) => void;
}

export function ItemGrid({ items, onEdit, onRemove, onAvailability }: ItemGridProps) {
	if (items.length === 0) {
		return <p className="text-center text-lg text-gray-500">Nenhum item encontrado.</p>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{items.map((item) => (
				<CardItem
					key={item.id}
					item={item}
					onEdit={onEdit}
					onRemove={onRemove}
					onAvailability={onAvailability}
				/>
			))}
		</div>
	);
}
