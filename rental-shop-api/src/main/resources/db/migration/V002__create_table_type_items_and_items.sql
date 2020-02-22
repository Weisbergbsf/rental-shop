CREATE TABLE IF NOT EXISTS type_items(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS items(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price NUMERIC(10,2) NOT NULL,
	description VARCHAR(150),
	quantity_stock INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS type_items_items(
	type_items_id INTEGER NOT NULL,
	items_id INTEGER NOT NULL,
	PRIMARY KEY (type_items_id, items_id),
	FOREIGN KEY (type_items_id) REFERENCES type_items(id),
	FOREIGN KEY (items_id) REFERENCES items(id)
);