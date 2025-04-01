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