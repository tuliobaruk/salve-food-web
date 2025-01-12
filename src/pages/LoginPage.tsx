import { LoginForm } from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			toast.success("Seja Bem vindo!");
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
