import { CardDriver } from "@/components/CardDriver";

interface Driver {
	id: number;
	nome: string;
	image: string;
	disponivel: boolean;
}

interface DriverGridProps {
	drivers: Driver[];
	onEdit: (id: number) => void;
	onRemove: (id: number) => void;
}

export function DriverGrid({ drivers, onEdit, onRemove }: DriverGridProps) {
	if (!Array.isArray(drivers) || drivers.length === 0) {
		return <p className="text-center text-lg text-gray-500">Nenhum entregador encontrado.</p>;
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{drivers.map((driver) => (
				<CardDriver key={driver.id} driver={driver} onEdit={onEdit} onRemove={onRemove} />
			))}
		</div>
	);
}
