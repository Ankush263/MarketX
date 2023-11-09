const pool = require('./pool');

pool
	.query(
		`
    ALTER TABLE users
    DROP CONSTRAINT IF EXISTS users_password_check;
    
    ALTER TABLE users
    ADD CONSTRAINT users_password_check CHECK (LENGTH(password) >= 8);
    
    ALTER TABLE users
    ADD UNIQUE (username);
    
    ALTER TABLE users
    ADD UNIQUE (avater);
    
    ALTER TABLE users
    ADD UNIQUE (email);
  `
	)
	.then(() => {
		console.log('Update complete');
		pool.end();
	})
	.catch((error) => console.log(error));
