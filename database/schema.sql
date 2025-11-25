-- Vehicles
CREATE TABLE vehicles (
    id            SERIAL PRIMARY KEY,
    make          TEXT NOT NULL,
    model         TEXT NOT NULL,
    year          INT  NOT NULL
--  car_image_url TEXT
);

-- Categories (home page cards after user enters vehicle)
CREATE TABLE categories (
    id        SERIAL PRIMARY KEY,
    name      TEXT NOT NULL
--  image_url TEXT          
);

-- Parts (products)
CREATE TABLE parts (
    id                  SERIAL PRIMARY KEY,
    vehicle_id          INT NOT NULL REFERENCES vehicles(id),
    category_id         INT NOT NULL REFERENCES categories(id),
    product_name        TEXT NOT NULL,
    product_description TEXT,
    price               NUMERIC(10,2)
--  product_image_url   TEXT,
  );
