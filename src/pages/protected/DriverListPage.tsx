import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useDrivers } from "@/hooks/useDrivers";
import { useLoja } from "@/context/LojaContext";
import { DriverGrid } from "@/components/DriverGrid";
import { Loading } from "@/components/Loading";

export default function DriverListPage() {
    const navigate = useNavigate();
    const { loja } = useLoja();

    const { drivers, loading, removeDriver } = useDrivers(loja?.id);

    const handleEdit = (driverId: number) => navigate(`/editar-entregador/${driverId}`);
    const handleCreateDriver = () => navigate("/criar-entregador");

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-muted p-6 md:p-10">
            <div className="w-full max-w-7xl relative space-y-6">
                <h1 className="text-3xl font-bold text-center mb-6">Entregadores</h1>
                
                <div className="flex justify-start">
                    <Button
                        onClick={handleCreateDriver}
                        className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Novo Entregador
                    </Button>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <DriverGrid drivers={drivers} onEdit={handleEdit} onRemove={removeDriver} />
                )}
            </div>
        </div>
    );
}
