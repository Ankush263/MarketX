/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.sql(
		`
    CREATE TYPE user_role AS ENUM ('business', 'customer');
  
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      username VARCHAR(30) NOT NULL,
      avater VARCHAR(200),
      email VARCHAR(50) NOT NULL,
      password VARCHAR(30) NOT NULL CHECK (LENGTH(password) > 8),
      role user_role DEFAULT 'customer'
    );
  `
	);
};

exports.down = (pgm) => {
	pgm.sql(
		`
    DROP TABLE users;
    DROP TYPE user_role;
  `
	);
};
