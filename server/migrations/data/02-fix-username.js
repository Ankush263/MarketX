const pool = require('./pool');

pool
	.query(
		`
    ALTER TABLE users
    ALTER COLUMN username TYPE VARCHAR(100);
    `
	)
	.then(() => {
		console.log('Update complete');
		pool.end();
	})
	.catch((error) => console.log(error));
