import { z } from 'zod';

const UserSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'Insira um valor válido para o nome.',
			required_error: 'O nome é obrigatório.',
		})
		.min(10, 'O nome deve ter pelo menos 10 caracteres.')
		.max(50, 'O nome deve ter no máximo 50 caracteres.'),
	email: z
		.string({
			invalid_type_error: 'Insira um valor válido para o email.',
			required_error: 'O email é obrigatório.',
		})
		.email('Insira um e-mail válido.'),
	password: z
		.string({
			invalid_type_error: 'Insira um valor válido para a senha.',
			required_error: 'A senha é obrigatória.',
		})
		.min(10, 'A senha deve ter pelo menos 10 caracteres.')
		.max(50, 'A senha deve ter no máximo 50 caracteres.'),
});

export default UserSchema;
