import { z } from "zod";
import { CreateStoreSchema } from "@/schema/zodSchemas";

type CreateStoreFormValues = z.infer<typeof CreateStoreSchema>;

export function createFormDataStoreRequest(values: CreateStoreFormValues): FormData {
	const formData = new FormData();
	formData.append("nome", values.nome);
	formData.append("descricao", values.descricao);
	formData.append("segmentoLojaId", values.segmentoLojaId);
	formData.append("diasFuncionamento", values.diasFuncionamento.join(","));
	formData.append("tiposPagamento", values.tiposPagamento.join(","));
	formData.append("rua", values.rua);
	formData.append("bairro", values.bairro);
	formData.append("numero", values.numero);
	formData.append("cidade", values.cidade);
	formData.append("estado", values.estado);

	if (values.file instanceof File) {
		formData.append("file", values.file);
	} else {
		console.warn("O arquivo fornecido não é uma instância válida de File.");
	}

	return formData;
}
