import * as z from "zod";

// Schema de validação da página de registro
export const RegisterSchema = z
	.object({
		name: z
			.string()
			.min(5, {
				message: "Por favor insira seu nome",
			})
			.refine((name) => name.trim().split(" ").length >= 2, {
				message: "Por favor, insira pelo menos um nome e um sobrenome",
			}),
		email: z.string().email({
			message: "Por favor insira um e-mail válido",
		}),
		phoneNumber: z.string().min(14, {
			message: "Insira um número de telefone válido",
		}),
		password: z.string().min(6, {
			message: "Senhas precisam ter no minimo 6 caracteres",
		}),
		confirmPassword: z.string().min(6, {
			message: "Senhas precisam ter no minimo 6 caracteres",
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "As senhas devem coincidir",
				path: ["confirmPassword"],
			});
		}
	});

// Schema de criação de loja
export const CreateStoreSchema = z.object({
	nome: z.string().min(1, { message: "O nome da loja é obrigatório." }),
	descricao: z.string().min(1, { message: "A descrição da loja é obrigatória." }),
	segmentoLojaId: z.string().min(1, { message: "O segmento da loja é obrigatório." }),
	rua: z.string().min(1, { message: "O nome da rua é obrigatório." }),
	bairro: z.string().min(1, { message: "O bairro é obrigatório." }),
	numero: z.string().min(1, { message: "O número é obrigatório." }),
	cidade: z.string().min(1, { message: "A cidade é obrigatória." }),
	estado: z.string().min(1, { message: "O estado é obrigatório." }),
});
