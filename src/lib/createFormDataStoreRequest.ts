import { z } from "zod";
import { CreateStoreSchema } from "@/schema/zodSchemas";

type CreateStoreFormValues = z.infer<typeof CreateStoreSchema>;

export function createFormDataStoreRequest(
	values: CreateStoreFormValues,
	coordinates: { lat: number; lng: number },
): FormData {
	const formData = new FormData();
	formData.append("nome", values.nome);
	formData.append("descricao", values.descricao);
	formData.append("segmentoLojaId", values.segmentoLojaId);
	formData.append("rua", values.rua);
	formData.append("bairro", values.bairro);
	formData.append("numero", values.numero);
	formData.append("cidade", values.cidade);
	formData.append("estado", values.estado);
	formData.append("latitude", coordinates.lat.toString());
	formData.append("longitude", coordinates.lng.toString());

	if (values.file instanceof File) {
		formData.append("file", values.file);
	} else {
		console.warn("O arquivo fornecido não é uma instância válida de File.");
	}

	return formData;
}
