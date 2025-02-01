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
import { CloudUpload, Paperclip } from "lucide-react";
import {
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from "@/components/ui/file-upload";

import { CreateDriverSchema } from "@/schema/zodSchemas";
type CreateDriverFormValues = z.infer<typeof CreateDriverSchema>;

interface CreateDriverFormProps {
	onSubmit: (values: CreateDriverFormValues) => void;
}

export default function CreateDriverForm({ onSubmit }: CreateDriverFormProps) {
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

	const form = useForm<CreateDriverFormValues>({
		resolver: zodResolver(CreateDriverSchema),
		defaultValues: {
			nome: "",
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
								<Input placeholder="Nome do Entregador" type="text" {...field} />
							</FormControl>

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
							<FormDescription>Imagem do Entregador</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Enviar</Button>
			</form>
		</Form>
	);
}
