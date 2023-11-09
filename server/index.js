const app = require('./src/app');
const pool = require('./src/pool');
require('dotenv').config();

const port = process.env.PORT || 8000;

const connect = async () => {
	try {
		await pool.connect({
			host: process.env.HOST,
			port: 5432,
			database: process.env.DATABASE,
			user: process.env.USER,
			password: process.env.PASSWORD,
		});

		app().listen(port, () => {
			console.log(`You are listening to the port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

connect();
