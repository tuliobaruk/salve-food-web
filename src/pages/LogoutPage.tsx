import { logout } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useLoja } from "@/context/LojaContext";
import salvezinho from "@/assets/images/salve-food-largo.png";
import { useEffect } from "react";

export default function LogoutPage() {
	const { clearLoja } = useLoja();
	const navigate = useNavigate();

	useEffect(() => {
		clearLoja();
		logout();
		setTimeout(() => navigate("/login"), 1500);
	});

	return (
		<div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
			<div className="w-full space-y-6 text-center">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
						Volte sempre!
					</h1>
					<p className="text-gray-500">Tenha um ótimo dia</p>
					<img src={salvezinho} className="mx-auto" />
				</div>
			</div>
		</div>
	);
}
