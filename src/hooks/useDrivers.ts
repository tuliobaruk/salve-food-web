import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosConfig";
import { toast } from "sonner";

interface Driver {
	id: number;
	nome: string;
	DriverImage: string;
}

export function useDrivers(lojaId: number | undefined) {
	const [drivers, setDrivers] = useState<Driver[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchDriver = async () => {
			setLoading(true);
			try {
				const response = await axiosInstance.get(`/api/entregador/${lojaId}`);
				setDrivers(response.data.content);
			} catch (error) {
				toast.error("Erro ao carregar os entregadores.");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		if (lojaId) fetchDriver();
	}, [lojaId]);

	const removeDriver = async (driverId: number) => {
		try {
			await axiosInstance.delete(`/api/entregador/${driverId}`);
			setDrivers((prev) => prev.filter((Driver) => Driver.id !== driverId));
			toast.success("Entregador removido com sucesso!");
		} catch (error) {
			toast.error("Erro ao remover o entregador.");
			console.error(error);
		}
	};

	return {
		drivers,
		loading,
		removeDriver,
	};
}