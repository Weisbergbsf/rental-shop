CREATE TABLE IF NOT EXISTS contracts(
	id SERIAL PRIMARY KEY,
	date_start TIMESTAMP,
	date_end TIMESTAMP,
	contract_status INTEGER NOT NULL,
	customer_id INTEGER NOT NULL,
	FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS contract_item(
	price NUMERIC(10,2) NOT NULL,
	quantity INTEGER,
	contract_id INTEGER NOT NULL,
	item_id INTEGER NOT NULL,
	PRIMARY KEY (contract_id, item_id),
	FOREIGN KEY (contract_id) REFERENCES contracts(id),
	FOREIGN KEY (item_id) REFERENCES items(id)
);