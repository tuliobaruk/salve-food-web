import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosConfig";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@/components/Pagination";
import { Loading } from "@/components/Loading";


export function useDrivers(pageSize: number) {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchDrivers = async (page: number) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/driver?page=${page}&pageSize=${pageSize}`);
            setDrivers(response.data.items);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Erro ao buscar motoristas:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeDriver = async (driverId: number) => {
        try {
            await axiosInstance.delete(`/api/driver/${driverId}`);
            setDrivers((prev) => prev.filter((driver) => driver.id !== driverId));
        } catch (error) {
            console.error("Erro ao remover motorista:", error);
        }
    };

    useEffect(() => {
        fetchDrivers(currentPage);
    }, [currentPage]);

    return { drivers, loading, currentPage, totalPages, setCurrentPage, removeDriver };
}
interface DriverGridProps {
    drivers: { id: number; nome: string; telefone: string }[];
    onEdit: (id: number) => void;
    onRemove: (id: number) => void;
}

export function DriverGrid({ drivers, onEdit, onRemove }: DriverGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drivers.map((driver) => (
                <div
                    key={driver.id}
                    className="p-4 bg-white rounded-lg shadow-md border border-gray-200 flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-lg font-bold">{driver.nome}</h3>
                        <p className="text-sm text-gray-600">{driver.telefone}</p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => onEdit(driver.id)}>
                            Editar
                        </Button>
                        <Button variant="destructive" onClick={() => onRemove(driver.id)}>
                            Remover
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default function DriverListPage() {
    const navigate = useNavigate();
    const pageSize = 10; // Define o tamanho da página para a paginação
    const { drivers, loading, currentPage, totalPages, setCurrentPage, removeDriver } = useDrivers(pageSize);

    const handleEdit = (driverId: number) => navigate(`/editar-motorista/${driverId}`);
    const handleCreateDriver = () => navigate("/criar-motorista");

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-muted p-6 md:p-10">
            <div className="w-full max-w-7xl relative space-y-6">
                <h1 className="text-3xl font-bold text-center mb-6">Lista de Motoristas</h1>
                <Button
                    onClick={handleCreateDriver}
                    className="absolute left-0 -top-5 flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
                >
                    Novo Motorista
                </Button>

                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <DriverGrid drivers={drivers} onEdit={handleEdit} onRemove={removeDriver} />
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
