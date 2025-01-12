import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { RegisterSchema } from "@/schema/zodSchemas";
import { splitName } from "@/lib/utils";
import axiosInstance from "@/api/axiosConfig";
import axios from "axios";

// Usando o schema que criei na pasta @/schema
// Podemos usar o Zod para validar outros cadastros da applicação
const formSchema = RegisterSchema;

export default function RegisterForm() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { firstName, lastName } = splitName(values.name);

			const payload = {
				firstName,
				lastName,
				email: values.email,
				password: values.password,
				phoneNumber: values.phoneNumber,
			};

			// TODO: Extrair isso aqui para o authService novo
			await axiosInstance.post("/api/auth/create", payload);

			toast.success("Cadastro realizado com sucesso!");
			setTimeout(() => navigate("/login"), 300);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.message ||
					"Algo deu errado no servidor. Tente novamente mais tarde.";

				toast.error(`Erro: ${errorMessage}`);
			} else {
				console.error("Erro inesperado:", error);
				toast.error("Ocorreu um erro inesperado. Por favor, tente novamente.");
			}
		}
	}

	return (
		<div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4">
			<Card className="mx-auto max-w-sm p-6">
				<CardHeader>
					<CardTitle className="text-2xl">Cadastro</CardTitle>
					<CardDescription>Preencha o formulário abaixo</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className="grid gap-4">
								{/* Campo do Nome*/}
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="name">Nome Completo</FormLabel>
											<FormControl>
												<Input id="name" placeholder="Exemplo Silva" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Campo do Email */}
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													placeholder="exemplo@email.com"
													type="email"
													autoComplete="email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Phone Field */}
								<FormField
									control={form.control}
									name="phoneNumber"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="phone">Número de telefone</FormLabel>
											<FormControl>
												<PhoneInput {...field} defaultCountry="BR" maxLength={15} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Campo de Senha */}
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="password">Senha</FormLabel>
											<FormControl>
												<PasswordInput
													id="password"
													placeholder="**********"
													autoComplete="new-password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Campo de Confirmar a Senha*/}
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="confirmPassword">Confirmar Senha</FormLabel>
											<FormControl>
												<PasswordInput
													id="confirmPassword"
													placeholder="**********"
													autoComplete="new-password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" className="w-full">
									Registrar-se
								</Button>
							</div>
						</form>
					</Form>
					<div className="mt-4 text-center text-sm">
						Já possui uma conta?{" "}
						<Link to="/login" className="underline">
							Logar
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
