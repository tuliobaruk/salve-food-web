import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosConfig";
import { toast } from "sonner";

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

export function useItems(lojaId: number | undefined, pageSize: number) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchItems = async () => {
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
    };

    if (lojaId) fetchItems();
  }, [currentPage, lojaId, pageSize]);

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
    removeItem,
  };
}
