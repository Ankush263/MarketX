/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.sql(
		`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id),
        business_id INTEGER REFERENCES business(id),
        name VARCHAR(200) NOT NULL,
        company VARCHAR(50) NOT NULL,
        description VARCHAR(500) NOT NULL,
        ratings INTEGER DEFAULT 0,
        image VARCHAR(200)[],
        price INTEGER NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 0,
        unit VARCHAR(20),
        type VARCHAR(50) NOT NULL
      );
    `
	);
};

exports.down = (pgm) => {
	pgm.sql(
		`
      DROP TABLE products;
    `
	);
};
