import { z } from 'zod';

const TaskCreateSchema = z.object({
	title: z
		.string({
			invalid_type_error: 'Insira um valor válido para o nome da tarefa.',
			required_error: 'O nome da tarefa é obrigatório.',
		})
		.min(5, 'O nome da tarefa deve ter pelo menos 5 caracteres.')
		.max(50, 'O nome da tarefa deve ter no máximo 50 caracteres.'),
	description: z
		.string({
			invalid_type_error: 'Insira um valor válido para a descrição da tarefa.',
			required_error: 'A descrição da tarefa é obrigatório.',
		})
		.min(1, 'A descrição da tarefa deve ter pelo menos 1 caractere.')
		.max(255, 'A descrição da tarefa deve ter no máximo 255 caracteres.'),
	status: z.enum(['PENDING', 'DONE'], {
		invalid_type_error: 'Insira um valor válido para o status da tarefa.',
		required_error: 'O status da tarefa é obrigatório.',
		message:
			'O status informado é inválido. Informe somente os valores PENDING ou DONE.',
	}),
});

const TaskUpdateSchema = z
	.object({
		title: z
			.string({
				invalid_type_error: 'Insira um valor válido para o nome da tarefa.',
				required_error: 'O nome da tarefa é obrigatório.',
			})
			.min(5, 'O nome da tarefa deve ter pelo menos 5 caracteres.')
			.max(50, 'O nome da tarefa deve ter no máximo 50 caracteres.')
			.optional(),
		description: z
			.string({
				invalid_type_error:
					'Insira um valor válido para a descrição da tarefa.',
				required_error: 'A descrição da tarefa é obrigatório.',
			})
			.min(1, 'A descrição da tarefa deve ter pelo menos 1 caractere.')
			.max(255, 'A descrição da tarefa deve ter no máximo 255 caracteres.')
			.optional(),
		status: z
			.enum(['PENDING', 'DONE'], {
				invalid_type_error: 'Insira um valor válido para o status da tarefa.',
				required_error: 'O status da tarefa é obrigatório.',
				message:
					'O status informado é inválido. Informe somente os valores PENDING ou DONE.',
			})
			.optional(),
	})
	.superRefine((schema, ctx) => {
		if (!schema.description && !schema.status && !schema.title) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Informe pelo menos 1 campo para realizar a alteração.',
				fatal: true,
			});

			return z.NEVER;
		}
	});

export { TaskCreateSchema as TaskSchema, TaskUpdateSchema };
