import { LoginForm } from "@/components/forms/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLoja } from "@/context/LojaContext";

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, logout, isAuthenticated, user } = useAuth();
	const { loja } = useLoja();

	useEffect(() => {
		if (isAuthenticated && user && loja) {
			navigate("/dashboard");
		}
	}, [isAuthenticated, user, navigate, loja]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			logout();
			const loggedInUser = await login(email, password);

			if (loggedInUser.roles.includes("dono_de_loja")) {
				toast.success("Seja Bem-vindo!");
				navigate("/dashboard");
			} else {
				toast.info(
					"Bem-vindo ao SalveFood! Parece que você ainda não possui uma loja. Vamos começar criando a sua agora!",
				);
				navigate("/criar-loja");
			}
		} catch (error) {
			console.error("Falha ao logar", error);
		}
	};

	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<LoginForm
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					handleSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
}
