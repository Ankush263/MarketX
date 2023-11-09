const pg = require('pg');
require('dotenv').config({ path: '../../.env' });

const pool = new pg.Pool({
	host: process.env.HOST,
	port: 5432,
	database: process.env.DATABASE,
	user: process.env.USER,
	password: process.env.PASSWORD,
});

module.exports = pool;
