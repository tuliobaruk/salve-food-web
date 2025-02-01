import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateDriverSchema } from "@/schema/zodSchemas";

type CreateDriverFormValues = z.infer<typeof CreateDriverSchema>;

interface CreateDriverFormProps {
	onSubmit: (values: CreateDriverFormValues) => void;
}

export default function CreateDriverForm({ onSubmit }: CreateDriverFormProps) {
	const form = useForm<CreateDriverFormValues>({
		resolver: zodResolver(CreateDriverSchema),
		defaultValues: {
			nome: "",
			telefone: "",
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
				<FormField
					control={form.control}
					name="nome"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder="Nome do motorista" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="telefone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Telefone</FormLabel>
							<FormControl>
								<Input placeholder="Telefone do motorista" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Cadastrar</Button>
			</form>
		</Form>
	);
}
