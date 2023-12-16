/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.sql(
		`
      CREATE TYPE payment AS ENUM ('Cash on delivery', 'UPI', 'card');

      CREATE TABLE buy (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER DEFAULT 1,
        payment_option payment DEFAULT 'card',
        sub_total INTEGER DEFAULT 0,
        paid BOOLEAN DEFAULT true
      );
    `
	);
};

exports.down = (pgm) => {
	pgm.sql(
		`
      DROP TABLE buy;
    `
	);
};
