DROP TABLE IF EXISTS items; 
CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    picture TEXT,
    title VARCHAR(255),
    locations VARCHAR(255),
    favorites VARCHAR(255)
);
