import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useItems } from "@/hooks/useItems";
import { Pagination } from "@/components/Pagination";
import { ItemGrid } from "@/components/ItemGrid";
import { useLoja } from "@/context/LojaContext";

export default function ItemListPage() {
	const navigate = useNavigate();
	const { loja } = useLoja();
	const pageSize = 8;
	const { items,
		loading,
		currentPage,
		totalPages,
		setCurrentPage,
		removeItem } = useItems(loja?.id, pageSize);

	const handleEdit = (itemId: number) => navigate(`/editar-item/${itemId}`);
	const handleCreateItem = () => navigate("/criar-item");

	// TODO: Se der tempo implementar caching
	return (
		<div className="flex min-h-screen flex-col items-center justify-start bg-muted p-6 md:p-10">
			<div className="w-full max-w-7xl relative space-y-6">
				<h1 className="text-3xl font-bold text-center mb-6">Cardápio</h1>
				<Button
					onClick={handleCreateItem}
					className="absolute left-0 -top-5 flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
				>
					<Plus className="w-5 h-5" />
					Novo Item
				</Button>

				{loading ? (
					<p>Carregando...</p>
				) : (
					<>
						<ItemGrid items={items} onEdit={handleEdit} onRemove={removeItem} />
						{totalPages > 1 && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={setCurrentPage}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
}
