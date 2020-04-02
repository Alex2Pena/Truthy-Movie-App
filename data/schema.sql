DROP TABLE if exists items;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    picture TEXT,
    locations text,
    comments text
);


