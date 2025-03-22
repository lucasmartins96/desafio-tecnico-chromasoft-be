const environmentVar = {
	port: Number(process.env.PORT) || 3000,
	secretKey: process.env.SECRET_KEY_JWT,
	db: {
		user: process.env.DB_USER,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
	},
};

export default environmentVar;
