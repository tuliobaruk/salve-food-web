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
import { TrashIcon, EditIcon } from "lucide-react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Item } from "@/types/Item";

interface CardItemProps {
	item: Item;
	onEdit: (id: number) => void;
	onRemove: (id: number) => void;
	onAvailability: (id: number) => void;
}

export const CardItem = ({ item, onEdit, onRemove, onAvailability }: CardItemProps) => {
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
					R$ {item.valor}
				</div>
			</div>
			<CardContent className="bg-white p-4">
				<div className="flex justify-between items-center">
					<span className="text-sm text-gray-500">{item.categoriaItem.nome}</span>
					<span
						onClick={() => onAvailability(item.id)}
						className={`relative z-20 text-sm font-bold px-2 py-1 rounded-lg cursor-pointer transition-colors duration-200 ${item.disponivel ? "text-green-600 bg-green-100 hover:bg-green-200" : "text-red-600 bg-red-100 hover:bg-red-200"}`}
					>
						{item.disponivel ? "Disponível" : "Indisponível"}
					</span>
				</div>
				<CardTitle className="font-bold text-xl mt-2">{item.nome}</CardTitle>
				<p className="text-gray-700 mt-2 line-clamp-2">{item.descricao}</p>

				<CardFooter className="my-6">
					<div className="absolute bottom-0 left-0 right-0 flex justify-between p-4 z-20">
						<Button
							variant="outline"
							onClick={() => onEdit(item.id)}
							className="flex items-center gap-2"
						>
							<EditIcon /> Editar
						</Button>

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="outline" className="flex items-center gap-2 text-red-600">
									<TrashIcon /> Remover
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
									<AlertDialogDescription>
										Esta ação não pode ser desfeita, isto irá deletar permanentemente este item do
										seu cardápio.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<AlertDialogAction
										className="flex items-center gap-1 text-red-600 bg-white"
										onClick={() => onRemove(item.id)}
									>
										<TrashIcon />
										Remover
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</CardFooter>
			</CardContent>
		</Card>
	);
};
