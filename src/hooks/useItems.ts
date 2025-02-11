import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/api/axiosConfig";
import { toast } from "sonner";
import { Item } from "@/types/Item";

export function useItems(lojaId: number | undefined, pageSize: number) {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [totalPages, setTotalPages] = useState<number>(1);

	const fetchItems = useCallback(async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get(`/api/item/${lojaId}`, {
				params: { page: currentPage, size: pageSize },
			});
			setItems(response.data.content);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			toast.error("Erro ao carregar os itens.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, [lojaId, currentPage, pageSize]);

	useEffect(() => {
		if (lojaId) fetchItems();
	}, [fetchItems, lojaId]);

	const updateAvailability = async (itemId: number) => {
		try {
			const item = items.find((i) => i.id === itemId);
			if (!item) return;

			await axiosInstance.put(`/api/item/${itemId}/disponibilidade`);

			await fetchItems();
			toast.success("Disponibilidade atualizada!");
		} catch (error) {
			toast.error("Erro ao atualizar disponibilidade");
			console.error(error);
		}
	};

	const removeItem = async (itemId: number) => {
		try {
			await axiosInstance.delete(`/api/item/${itemId}`);
			setItems((prev) => prev.filter((item) => item.id !== itemId));
			toast.success("Item removido com sucesso!");
		} catch (error) {
			toast.error("Erro ao remover o item.");
			console.error(error);
		}
	};

	return {
		items,
		loading,
		currentPage,
		totalPages,
		setCurrentPage,
		fetchItems,
		removeItem,
		updateAvailability,
	};
}
