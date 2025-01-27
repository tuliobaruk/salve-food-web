import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosConfig";
import { createFormDataItemRequest } from "@/lib/createFormDataItemRequest";
import EditItemForm from "@/components/forms/EditItemForm";
import useFetchCategorias from "@/hooks/useFetchCategorias";
import { useLoja } from "@/context/LojaContext";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { CreateItemSchema } from "@/schema/zodSchemas";
import { Loading } from "@/components/Loading";

type EditItemFormValues = z.infer<typeof CreateItemSchema>;

export default function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categorias, loading: categoriasLoading } = useFetchCategorias();
  const { loja } = useLoja();

  const [item, setItem] = useState<{
    nome: string;
    descricao: string;
    valor: number;
    categoriaItemId: string;
    itemImage: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axiosInstance.get(`/api/item/unico/${id}`, {
          params: { id },
        });

        const fetchedItem = response.data;

        setItem({
          nome: fetchedItem.nome,
          descricao: fetchedItem.descricao,
          valor: fetchedItem.valor,
          categoriaItemId: String(fetchedItem.categoriaItem.id),
          itemImage: fetchedItem.itemImage,
        });

        setLoading(false);
      } catch (error) {
        toast.error("Erro ao carregar dados do item.");
        console.error("Erro ao buscar item:", error);
        navigate("/cardapio");
      }
    }

    if (id) fetchItem();
  }, [id, navigate]);

  async function handleSubmit(values: EditItemFormValues) {
    try {
      const formData = createFormDataItemRequest(values);
      formData.append("lojaId", String(loja?.id));

      await axiosInstance.put(`/api/item/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Item atualizado com sucesso!");
      setTimeout(() => navigate("/cardapio"), 300);
    } catch (error) {
      toast.error("Falha ao atualizar o item.");
      console.error("Erro ao submeter o formulário:", error);
    }
  }

  if (loading || categoriasLoading) {
    return <Loading/>
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="w-full max-w-7xl relative mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Edição de Item</h1>
        <Button
          onClick={() => navigate("/cardapio")}
          className="absolute left-0 top-0 flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
        >
          Voltar
        </Button>
      </div>
      <div className="mt-10">
        {item && (
          <EditItemForm
            item={item}
            categorias={categorias}
            loading={loading}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
