import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLoja } from "@/context/LojaContext";
import { CardItem } from "@/components/CardItem"; // Importe o CardItem

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

export default function ItemListPage() {
  const navigate = useNavigate();
  const { loja } = useLoja();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize] = useState<number>(8);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get(`/api/item/${loja?.id}`, {
          params: {
            page: currentPage,
            size: pageSize,
          },
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

    fetchItems();
  }, [currentPage, pageSize]);

  const handleEdit = (itemId: number) => {
    navigate(`/editar-item/${itemId}`);
  };

  const handleRemove = async (itemId: number) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      try {
        await axiosInstance.delete(`/api/item/${itemId}`);
        setItems(items.filter((item) => item.id !== itemId));
        toast.success("Item removido com sucesso!");
      } catch (error) {
        toast.error("Erro ao remover o item.");
        console.error(error);
      }
    }
  };


  // TODO: Implementar
  const handleCreateItem = () => {
	  navigate("/criar-item");
	};

	// TODO: Melhorar essa paginação
	const handlePageChange = (newPage: number) => {
	  setCurrentPage(newPage);
	};

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-muted p-6 md:p-10">
      <div className="w-full max-w-7xl space-y-6">
        <h1 className="text-3xl font-bold text-center mb-6">Itens do Cardápio</h1>
        <Button
          onClick={handleCreateItem}
          className="mb-4 bg-blue-600 text-white hover:bg-blue-700"
        >
          Criar Novo Item
        </Button>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <CardItem
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="mr-2"
              >
                Anterior
              </Button>
              <p className="flex items-center justify-center text-lg">
                Página {currentPage + 1} de {totalPages}
              </p>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="ml-2"
              >
                Próxima
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
