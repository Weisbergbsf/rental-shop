CREATE TABLE IF NOT EXISTS customers(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	birth_date DATE,
	email VARCHAR(100) UNIQUE NOT NULL,
	phone_number VARCHAR(18)
);

CREATE TABLE IF NOT EXISTS addresses(
	id SERIAL PRIMARY KEY,
	street VARCHAR(100) NOT NULL,
	number_address VARCHAR(10),
	neighborhood VARCHAR(100),
	city VARCHAR(100),
	uf VARCHAR(2),
	zip_code VARCHAR(9),
	customer_id INTEGER NOT NULL,
	FOREIGN KEY (customer_id) REFERENCES customers(id) 
);
