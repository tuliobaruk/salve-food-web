import * as z from "zod";

// Schema de validação da página de registro
export const RegisterSchema = z
	.object({
		name: z.string().min(5, {
			message: "Por favor insira seu nome",
		}).refine((name) => name.trim().split(" ").length >= 2, {
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
