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
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

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

// MultiSelector:
const OPTIONS_DiasDeFuncionamento: Option[] = [
	{ label: "Segunda-feira", value: "SEG" },
	{ label: "Terça-feira", value: "TER" },
	{ label: "Quarta-feira", value: "QUAR" },
	{ label: "Quinta-feira", value: "QUI" },
	{ label: "Sexta-feira", value: "SEX" },
	{ label: "Domingo", value: "DOM" },
];

const OPTIONS_TiposDePagamento: Option[] = [
	{ label: "Dinheiro", value: "DINHEIRO" },
	{ label: "Cartão de Débito", value: "CARTAO_DEBITO" },
	{ label: "Cartão de Crédito", value: "CARTAO_CREDITO" },
	{ label: "Pix", value: "PIX" },
];

export default function CreateStoreForm({ segmentos, loading, onSubmit }: CreateStoreFormProps) {
	const [files, setFiles] = useState<File[] | null>(null);
	const [cep, setCep] = useState<string>("");

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

	const handleCepSearch = async () => {
		if (cep.length === 8) {
			try {
				const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
				const data = await response.json();
				if (data.cep) {
					form.setValue("rua", data.logradouro || "");
					form.setValue("bairro", data.bairro || "");
					form.setValue("cidade", data.localidade || "");
					form.setValue("estado", data.uf || "");
				} else {
					alert("CEP não encontrado.");
				}
			} catch (error) {
				console.log("Erro ao buscar o CEP.");
				console.error(error);
			}
		} else {
			alert("Digite um CEP válido.");
		}
	};

	const form = useForm<CreateStoreFormValues>({
		resolver: zodResolver(CreateStoreSchema),
		defaultValues: {
			nome: "",
			descricao: "",
			segmentoLojaId: "",
			diasFuncionamento: [],
			tiposPagamento: [],
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
				<div className="border-t border-gray-200 mt-8 pt-6">
					<h2 className="text-xl font-semibold mb-4">Dados Gerais</h2>
				</div>

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
					name="diasFuncionamento"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dias de Funcionamento</FormLabel>
							<FormControl>
								<MultipleSelector
									defaultOptions={OPTIONS_DiasDeFuncionamento}
									onChange={(options) => field.onChange(options.map((option) => option.value))}
									emptyIndicator={
										<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
											Nenhuma opção encontrada
										</p>
									}
								/>
							</FormControl>
							<FormDescription>
								Dias da semana em que o estabelecimento estará aberto
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tiposPagamento"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipos de pagamento</FormLabel>
							<FormControl>
								<MultipleSelector
									defaultOptions={OPTIONS_TiposDePagamento}
									onChange={(options) => field.onChange(options.map((option) => option.value))}
									emptyIndicator={
										<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
											Nenhuma opção encontrada
										</p>
									}
								/>
							</FormControl>
							<FormDescription>Tipos de pagamentos aceitos</FormDescription>
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
							<FormDescription>Uma Imagem para sua loja</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="border-t border-gray-200 mt-8 pt-6">
					<h2 className="text-xl font-semibold mb-4">Dados de endereço</h2>
				</div>

				<FormField
					control={form.control}
					// @ts-expect-error: Não quero enviar CEP na requisição só está aqui para auxiliar o preenchimento
					name="cep"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CEP</FormLabel>
							<FormControl>
								{/* @ts-expect-error: Não quero enviar CEP na requisição só está aqui para auxiliar o preenchimento */}
								<Input
									placeholder="Digite o CEP"
									type="text"
									{...field}
									onChange={(e) => {
										field.onChange(e);
										setCep(e.target.value);
									}}
								/>
							</FormControl>
							<Button type="button" onClick={handleCepSearch} className="mt-4">
								Buscar CEP
							</Button>
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
									<Select value={field.value || ""} onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione o estado" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(estados).map(([codigo, nome]) => (
												<SelectItem key={codigo} value={codigo}>
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

				<Button type="submit">Enviar</Button>
			</form>
		</Form>
	);
}
