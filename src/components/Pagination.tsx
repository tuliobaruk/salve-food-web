import { Button } from "@/components/ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	return (
		<div className="flex justify-center mt-6">
			<Button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 0}
				className="mr-2"
			>
				Anterior
			</Button>
			<p className="flex items-center justify-center text-lg">
				Página {currentPage + 1} de {totalPages}
			</p>
			<Button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages - 1}
				className="ml-2"
			>
				Próxima
			</Button>
		</div>
	);
}
