import { Button } from "@/components/ui/button";
import { TrashIcon, EditIcon } from "lucide-react";
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

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

interface CardItemProps {
	item: Item;
	onEdit: (id: number) => void;
	onRemove: (id: number) => void;
}

export const CardItem = ({ item, onEdit, onRemove }: CardItemProps) => {
	return (
		<Card className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
			<div className="relative">
				<img
					src={item.itemImage}
					alt={item.nome}
					className="object-cover w-full h-64"
					style={{ aspectRatio: "400/300", objectFit: "cover" }}
				/>

				<div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg shadow-lg">
					R$ {item.valor.toFixed(2)}
				</div>
			</div>
			<CardContent className="bg-white p-4">
				<CardTitle className="font-bold text-xl">{item.nome}</CardTitle>
				<CardDescription className="text-sm text-gray-500">
					{item.categoriaItem.nome}
				</CardDescription>
				<p className="text-gray-700 mt-2 line-clamp-2">{item.descricao}</p>

				<CardFooter className="my-6">
					<div className="absolute inset-0 z-20 flex justify-between items-end p-4">
						<Button
							variant="outline"
							onClick={() => onEdit(item.id)}
							className="flex items-center gap-2"
						>
							<EditIcon /> Editar
						</Button>

						<Button
							variant="outline"
							onClick={() => onRemove(item.id)}
							className="flex items-center gap-2 text-red-600"
						>
							<TrashIcon /> Remover
						</Button>
					</div>
				</CardFooter>
			</CardContent>
		</Card>
	);
};
