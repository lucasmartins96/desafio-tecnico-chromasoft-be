import { User } from '../models/user';
import bcrypt from 'bcrypt';
import NotFoundError from '../common/request-errors/not-found';
import BadRequestError from '../common/request-errors/bad-request';
import JWTService from '../common/jwt';

type LoginPayload = {
	id: number;
	name: string;
	email: string;
	token: string;
};

type AddProps = {
	name: string;
	email: string;
	password: string;
};

export default class AuthService {
	private jwt: JWTService;

	constructor() {
		this.jwt = new JWTService();
	}

	async login(email?: string, password?: string): Promise<LoginPayload> {
		try {
			const foundUser = await User.findOne({ where: { email } });
			const formPassword = password ?? '';

			if (!foundUser) {
				throw new NotFoundError({
					message: 'Usuário não encontrado!',
					showLogging: true,
				});
			}

			const isMatch = bcrypt.compareSync(formPassword, foundUser!.password);

			if (!isMatch) {
				throw new BadRequestError({
					message: 'Senha incorreta. Tente novamente!',
					showLogging: true,
				});
			}

			const token = this.jwt.generateToken({
				id: foundUser?.id,
				name: foundUser?.name,
				email: foundUser?.email,
			});

			return {
				id: foundUser.id,
				name: foundUser.name,
				email: foundUser.email,
				token,
			};
		} catch (error) {
			throw error;
		}
	}

	async signin(props: AddProps): Promise<User | null> {
		try {
			const hashedPassword = bcrypt.hashSync(props.password, 10);
			const newUser = new User({ ...props, password: hashedPassword });
			const created = await newUser.save();
			return created;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async checkEmailExists(email: string): Promise<boolean> {
		try {
			const userFound = await User.findOne({ where: { email } });
			return userFound !== null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
