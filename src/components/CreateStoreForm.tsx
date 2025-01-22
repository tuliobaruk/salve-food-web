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
import { CreateStoreSchema } from "@/schema/zodSchemas";
import { useState } from "react";

type CreateStoreFormValues = z.infer<typeof CreateStoreSchema>;

interface CreateStoreFormProps {
	segmentos: { id: string; nome: string; emoji: string }[];
	loading: boolean;
	onSubmit: (values: CreateStoreFormValues) => void;
}

const estados: Record<string, string> = {
	AC: "Acre",
	AL: "Alagoas",
	AP: "Amapá",
	AM: "Amazonas",
	BA: "Bahia",
	CE: "Ceará",
	DF: "Distrito Federal",
	ES: "Espírito Santo",
	GO: "Goiás",
	MA: "Maranhão",
	MT: "Mato Grosso",
	MS: "Mato Grosso do Sul",
	MG: "Minas Gerais",
	PA: "Pará",
	PB: "Paraíba",
	PR: "Paraná",
	PE: "Pernambuco",
	PI: "Piauí",
	RJ: "Rio de Janeiro",
	RN: "Rio Grande do Norte",
	RS: "Rio Grande do Sul",
	RO: "Rondônia",
	RR: "Roraima",
	SC: "Santa Catarina",
	SP: "São Paulo",
	SE: "Sergipe",
	TO: "Tocantins",
};

export default function CreateStoreForm({ segmentos, loading, onSubmit }: CreateStoreFormProps) {
	const [files, setFiles] = useState<File[] | null>(null);

	const dropZoneConfig = {
		maxFiles: 1,
		maxSize: 1024 * 1024 * 4,
		multiple: true,
	};

	const form = useForm<CreateStoreFormValues>({
		resolver: zodResolver(CreateStoreSchema),
		defaultValues: {
			nome: "",
			descricao: "",
			segmentoLojaId: "",
			rua: "",
			bairro: "",
			numero: "",
			cidade: "",
			estado: "",
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
								<Input placeholder="Nome da loja" type="text" {...field} />
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
								<Input placeholder="Descrição da loja" type="text" {...field} />
							</FormControl>
							<FormDescription>Uma breve descrição sobre a loja</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="segmentoLojaId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Segmento da loja</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder={loading ? "Carregando..." : "Selecione um segmento"}
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{segmentos.map((segmento) => (
										<SelectItem key={segmento.id} value={String(segmento.id)}>
											{segmento.emoji} {segmento.nome}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>Segmento onde a loja mais se encaixa</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="file"
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field }) => (
						<FormItem>
							<FormLabel>Imagem</FormLabel>
							<FormControl>
								<FileUploader
									value={files}
									// TODO - Realmente enviar a imagem
									// onValueChange={(uploadedFiles) => {
									// 	if (uploadedFiles && uploadedFiles[0]) {
									// 		setFiles(uploadedFiles);
									// 		form.setValue("file", uploadedFiles[0]);
									// 	} else {
									// 		setFiles(null);
									// 		form.setValue("file", null);
									// 	}
									// }}
									onValueChange={setFiles}
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
											<p className="text-xs text-gray-500 dark:text-gray-400">
												SVG, PNG, JPG ou GIF
											</p>
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
							<FormDescription>Uma Imagem para sua loja</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="rua"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rua</FormLabel>
							<FormControl>
								<Input placeholder="Rua" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="bairro"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bairro</FormLabel>
									<FormControl>
										<Input placeholder="Bairro" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="col-span-6">
						<FormField
							control={form.control}
							name="numero"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número</FormLabel>
									<FormControl>
										<Input placeholder="Número" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="cidade"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cidade</FormLabel>
									<FormControl>
										<Input placeholder="Cidade" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="col-span-6">
						<FormField
							control={form.control}
							name="estado"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Estado</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Estado" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(estados).map(([codigo, nome]) => (
												<SelectItem key={codigo} value={nome}>
													{nome}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
