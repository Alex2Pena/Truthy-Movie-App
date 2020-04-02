DROP TABLE IF EXISTS items; 
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    picture TEXT,
    locations text,
    providerIcon text
);

SELECT * FROM items;
