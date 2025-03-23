import jwt from 'jsonwebtoken';
import { StringValue } from 'ms';
import environmentVar from '../env';
import JwtUserPayload from '../interfaces/jwt';

export default class JWTService {
	private secret: string;
	private expiresIn: StringValue;

	constructor(expiresIn: StringValue = '30m') {
		this.secret = environmentVar.secretKey!;
		this.expiresIn = expiresIn;
	}

	public generateToken(payload: JwtUserPayload): string {
		return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
	}

	public async verifyTokenAsynchronously(
		token: string,
	): Promise<JwtUserPayload | null> {
		try {
			return new Promise((resolve, reject) => {
				jwt.verify(token, this.secret, (err, decoded) => {
					if (err) {
						reject(err);
					} else {
						resolve(decoded as JwtUserPayload);
					}
				});
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	public verifyTokenSynchronously(token: string): JwtUserPayload | null {
		try {
			const decoded = jwt.verify(token, this.secret);
			return decoded as JwtUserPayload;
		} catch (error) {
			console.error('Erro ao verificar o token:', error);
			return null;
		}
	}

	public decodeToken(token: string): JwtUserPayload | null {
		try {
			const decoded = jwt.decode(token);
			return decoded as JwtUserPayload;
		} catch (error) {
			console.error('Erro ao decodificar o token:', error);
			return null;
		}
	}
}
