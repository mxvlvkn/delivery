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
    sale_price INTEGER,
    price INTEGER,
    weight INTEGER,
    description VARCHAR(300),
    img VARCHAR(120)
);