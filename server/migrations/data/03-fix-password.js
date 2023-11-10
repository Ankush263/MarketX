const pool = require('./pool');

pool
	.query(
		`
    ALTER TABLE users
    ALTER COLUMN password TYPE VARCHAR(300);
    `
	)
	.then(() => {
		console.log('Update complete');
		pool.end();
	})
	.catch((error) => console.log(error));
