import { z } from "zod";
import { CreateDriverSchema } from "@/schema/zodSchemas";

type CreateDriverFormValues = z.infer<typeof CreateDriverSchema>;

export function createFormDataDriverRequest(values: CreateDriverFormValues): FormData {
	const formData = new FormData();
	formData.append("nome", values.nome);

	if (values.file instanceof File) {
		formData.append("file", values.file);
	} else {
		console.warn("O arquivo fornecido não é uma instância válida de File.");
	}

	return formData;
}
