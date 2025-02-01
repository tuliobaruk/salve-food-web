import { Button } from "@/components/ui/button";
import { TrashIcon, EditIcon } from "lucide-react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";

interface Driver {
	id: number;
	nome: string;
	DriverImage: string;
}

interface CardDriverProps {
	driver: Driver;
	onEdit: (id: number) => void;
	onRemove: (id: number) => void;
}

export const CardDriver = ({ driver, onEdit, onRemove }: CardDriverProps) => {
	return (
		<Card className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
			<div className="relative">
				<img
					src={driver.DriverImage}
					alt={driver.nome}
					className="object-cover w-full h-64"
					style={{ aspectRatio: "400/300", objectFit: "cover" }}
				/>
			</div>
			<CardContent className="bg-white p-4">
				<CardTitle className="font-bold text-xl">{driver.nome}</CardTitle>

				<CardFooter className="my-6">
					<div className="absolute inset-0 z-20 flex justify-between items-end p-4">
						<Button
							variant="outline"
							onClick={() => onEdit(driver.id)}
							className="flex items-center gap-2"
						>
							<EditIcon /> Editar
						</Button>

						<Button
							variant="outline"
							onClick={() => onRemove(driver.id)}
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
