import { useState, useEffect } from "react";
import { fetchPedidoData } from "@/services/pedidoService";
import { Pedido } from "@/types/Pedido";
import { Pagination } from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function HistoryPage() {
    const [pedidosEntregues, setPedidosEntregues] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchPedidosEntregues = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetchPedidoData("ENTREGUE", page);
            setPedidosEntregues(response?.content || []);
            setTotalPages(response?.totalPages || 0);
        } catch (error: any) {
            toast.error("Erro ao carregar pedidos entregues");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPedidosEntregues(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const getNomeCliente = (pedido: Pedido) => {
        return `${pedido.criadoPor.firstName} ${pedido.criadoPor.lastName}`;
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <Card className="max-w-6xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Histórico de Pedidos</CardTitle>
                    <button
                        onClick={() => fetchPedidosEntregues(currentPage)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        Atualizar
                    </button>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Carregando pedidos...</p>
                        </div>
                    ) : pedidosEntregues.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Nenhum pedido entregue encontrado</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pedidosEntregues.map((pedido) => (
                                <div
                                    key={pedido.id}
                                    className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold">Pedido #{pedido.id}</h3>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Cliente: </span>
                                                {getNomeCliente(pedido)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Contato: </span>
                                                {pedido.criadoPor.phone}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Data: </span>
                                                {pedido.dataPedido}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Entregador: </span>
                                                {pedido.entregador?.nome || "N/A"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">
                                                R$ {pedido.valorTotal.toFixed(2)}
                                            </p>
                                            <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                                Entregue
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-3">
                                        <p className="text-sm font-semibold mb-2">Itens do Pedido:</p>
                                        <ul className="space-y-1">
                                            {pedido.itens.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="text-sm text-gray-600 flex justify-between"
                                                >
                                                    <span>
                                                        {item.quantidade}x {item.item.nome}
                                                    </span>
                                                    <span>
                                                        R$ {(item.quantidade * item.valorUnitario).toFixed(2)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}

                            {totalPages > 1 && (
                                <div className="mt-6">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}