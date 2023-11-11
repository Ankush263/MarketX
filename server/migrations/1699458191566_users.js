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
      username VARCHAR(100) NOT NULL UNIQUE,
      avater VARCHAR(300) UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(300) NOT NULL CHECK (LENGTH(password) >= 8),
      role user_role DEFAULT 'customer',
      passwordResetToken VARCHAR(500),
      passwordResetExpires TIMESTAMP WITH TIME ZONE,
      passwordChangedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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
