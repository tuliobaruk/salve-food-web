/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CloudUpload, Paperclip } from "lucide-react";
import {
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from "@/components/ui/file-upload";

import { CreateItemSchema } from "@/schema/zodSchemas";
import MoneyInput from "@/components/ui/money-input";
type CreateItemFormValues = z.infer<typeof CreateItemSchema>;

interface CreateItemFormProps {
	categorias: { id: string; nome: string }[];
	loading: boolean;
	onSubmit: (values: CreateItemFormValues) => void;
}

export default function CreateItemForm({ categorias, loading, onSubmit }: CreateItemFormProps) {
	const [files, setFiles] = useState<File[] | null>(null);

	const dropZoneConfig = {
		maxFiles: 1,
		maxSize: 1024 * 1024 * 4,
		multiple: false,
	};

	const handleFileChange = (uploadedFiles: File[] | null) => {
		setFiles(uploadedFiles);
		if (uploadedFiles && uploadedFiles[0]) {
			form.setValue("file", uploadedFiles[0]);
		} else {
			form.setValue("file", null);
		}
	};

	const form = useForm<CreateItemFormValues>({
		resolver: zodResolver(CreateItemSchema),
		defaultValues: {
			nome: "",
			descricao: "",
			categoriaItemId: "",
			valor: "",
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
								<Input placeholder="Nome do item" type="text" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="descricao"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Input placeholder="" type="text" {...field} />
							</FormControl>
							<FormDescription>Uma breve descrição do item</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="categoriaItemId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoria</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={loading ? "Carregando..." : "Selecione uma Categoria"}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categorias?.length > 0 ? (
										categorias.map((categoria) => (
											<SelectItem key={categoria.id} value={String(categoria.id)}>
												{categoria.nome}
											</SelectItem>
										))
									) : (
										<p>Carregando categorias...</p>
									)}
								</SelectContent>
							</Select>
							<FormDescription>Selecione uma categoria apropriada para o item</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="valor"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<MoneyInput
									form={form}
									label="Valor"
									name="valor"
									placeholder="Preço do item no cardápio"
								/>
							</FormControl>
							<FormDescription>Preço do item no cardápio</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="file"
					render={() => (
						<FormItem>
							<FormLabel>Imagem</FormLabel>
							<FormControl>
								<FileUploader
									value={files}
									onValueChange={handleFileChange}
									dropzoneOptions={dropZoneConfig}
									className="relative bg-background rounded-lg p-2"
								>
									<FileInput id="fileInput" className="outline-dashed outline-1 outline-slate-500">
										<div className="flex items-center justify-center flex-col p-8 w-full ">
											<CloudUpload className="text-gray-500 w-10 h-10" />
											<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
												<span className="font-semibold">Clique para fazer upload</span>
												&nbsp; ou araste uma imagem
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">PNG ou JPG</p>
										</div>
									</FileInput>
									<FileUploaderContent>
										{files &&
											files.length > 0 &&
											files.map((file, i) => (
												<FileUploaderItem key={i} index={i}>
													<Paperclip className="h-4 w-4 stroke-current" />
													<span>{file.name}</span>
												</FileUploaderItem>
											))}
									</FileUploaderContent>
								</FileUploader>
							</FormControl>
							<FormDescription>Imagem do item</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Enviar</Button>
			</form>
		</Form>
	);
}
