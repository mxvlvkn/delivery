create TABLE user_admin(
    id SERIAL PRIMARY KEY,
    login VARCHAR(200),
    password VARCHAR(30)
);

INSERT INTO user_admin (login, password) VALUES ('11', '11');

create TABLE user_token(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    token text
);

create TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    is_sale BOOLEAN,
    sale_price NUMERIC(10, 2),
    price NUMERIC(10, 2),
    weight INTEGER,
    description VARCHAR(300),
    img VARCHAR(120)
);

create TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

create TABLE category_product(
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE
);

create TABLE orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    phone VARCHAR(30),
    delivery VARCHAR(30),
    address  VARCHAR(410),
    flat  VARCHAR(110),
    comment  VARCHAR(410),
    tools  VARCHAR(30),
    price  NUMERIC(10, 2)
);

create TABLE product_in_order(
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    count INTEGER,
    current_price  NUMERIC(10, 2)
);