import axiosInstance from "@/api/axiosConfig";
import EditStoreForm from "@/components/forms/EditStoreForm";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useLoja } from "@/context/LojaContext";
import useFetchSegmentos from "@/hooks/useFetchSegmentos";
import { createFormDataStoreRequest } from "@/lib/createFormDataStoreRequest";
import { toast } from "sonner";
import { CreateStoreSchema } from "@/schema/zodSchemas";
import * as z from "zod";

type CreateStoreFormValues = z.infer<typeof CreateStoreSchema>;

export default function ConfigPage() {
	const { segmentos, loading } = useFetchSegmentos();
	const { loja, setLoja } = useLoja();
	const { user } = useAuth();

	const handleEditSubmit = async (values: CreateStoreFormValues) => {
		try {
			if (!loja) return;

			const formData = createFormDataStoreRequest(values);

			const response = await axiosInstance.put(`/api/loja/${loja.id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast.success("Loja atualizada com sucesso!");
			console.log("Resposta da API:", response.data);

			if (response.data) {
				setLoja(response.data);
			}
		} catch (error) {
			toast.error("Falha ao atualizar a loja, verifique o console para detalhes.");
			console.error("Erro ao atualizar a loja:", error);
		}
	};

	return (
		<div className="w-5/6 mx-auto my-4">
			<h1 className="text-2xl font-bold tracking-tighter sm:text-4xl text-center mb-5">
				Configurações
			</h1>
			<Tabs defaultValue="loja" className="">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="loja">Dados da Loja</TabsTrigger>
					<TabsTrigger value="conta">Dados da Conta</TabsTrigger>
					<TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
					<TabsTrigger value="notificacoes">Notificações</TabsTrigger>
				</TabsList>
				<TabsContent value="loja">
					{loja ? (
						<EditStoreForm
							store={loja}
							segmentos={segmentos}
							loading={loading}
							onSubmit={handleEditSubmit}
						/>
					) : (
						"Não possui loja"
					)}
				</TabsContent>
				<TabsContent value="conta">
					<Card>
						<CardHeader>
							<CardTitle>Conta</CardTitle>
							<CardDescription>
								Faça alterações em sua conta aqui. Clique em salvar quando terminar.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Nome</Label>
								<Input id="name" defaultValue={user?.name} />
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">Email</Label>
								<Input id="username" defaultValue={user?.email} />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Salvar</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="pagamentos">
					<div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto">
						<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
							Placeholder configurações de recebimento de pagamentos
						</h1>
					</div>
				</TabsContent>
				<TabsContent value="notificacoes">
					<div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 mx-auto">
						<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
							Placeholder configurações de notificações
						</h1>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
