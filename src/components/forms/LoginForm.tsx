import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import salveImage from "@/assets/images/salve-food-largo.png";

interface LoginFormProps {
	className?: string | undefined;
	email: string;
	password: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
	className,
	email,
	password,
	setEmail,
	setPassword,
	handleSubmit,
	...props
}: LoginFormProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card className="overflow-hidden">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center text-center">
								<h1 className="text-2xl font-bold">Bem vindo</h1>
								<p className="text-balance text-muted-foreground">
									Faça login em sua conta SalveFood
								</p>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="email@exemplo.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Senha</Label>
									<a
										href="#"
										className="ml-auto text-sm underline-offset-2 hover:underline"
										tabIndex={-1}
									>
										Esqueceu sua senha?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								Entrar
							</Button>

							<div className="text-center text-sm">
								Ainda não possui uma conta?{" "}
								<Link to={"/singup"} className="underline underline-offset-4">
									Cadastre-se
								</Link>
							</div>
						</div>
					</form>
					<div className="relative hidden bg-muted md:block">
						<img
							src={salveImage}
							alt="Imagem SalveFood"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				Ao utilizar a plataforma, você concorda com nossos <a href="#">Termos de Serviço</a> e{" "}
				<a href="#">Política de Privacidade</a>.
			</div>
		</div>
	);
}
