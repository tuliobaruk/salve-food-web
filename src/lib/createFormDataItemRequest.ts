import { z } from "zod";
import { CreateItemSchema } from "@/schema/zodSchemas";

type CreateItemFormValues = z.infer<typeof CreateItemSchema>;

export function createFormDataItemRequest(values: CreateItemFormValues): FormData {
	const formData = new FormData();
	formData.append("nome", values.nome);
	formData.append("descricao", values.descricao);
	formData.append("categoriaItemId", values.categoriaItemId);
	formData.append("valor", values.valor.replace(/[^0-9.]/g, "").trim());
	if (values.file instanceof File) {
		formData.append("file", values.file);
	} else {
		console.warn("O arquivo fornecido não é uma instância válida de File.");
	}

	return formData;
}
