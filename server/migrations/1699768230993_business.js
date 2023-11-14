/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.sql(
		`
      CREATE TABLE business (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER[] DEFAULT '{}'::INTEGER[]
      );
    `
	);
};

exports.down = (pgm) => {
	pgm.sql(
		`
      DROP TABLE business;
    `
	);
};

// TODO: Make sure when you add a product, the id of that product should add with business account ✅
// TODO: Add business id to the product table ✅
