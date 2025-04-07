CREATE OR REPLACE FUNCTION save_product(
    name VARCHAR(100),
    is_sale BOOLEAN,
    sale_price INTEGER,
    price INTEGER,
    weight INTEGER,
    description VARCHAR(300),
    img_path VARCHAR(120),
    img_exp VARCHAR(15)
)
RETURNS INTEGER AS $$
DECLARE
    _id INTEGER;
BEGIN
    INSERT INTO product (
        name,
        is_sale,
        sale_price,
        price,
        weight,
        description,
        img
    )
    VALUES (
        name,
        is_sale,
        sale_price,
        price,
        weight,
        description,
        NULL
    )
    RETURNING id INTO _id;

    UPDATE product
    SET img = img_path || _id || '.' || img_exp
    WHERE id = _id;

    RETURN _id;
END;
$$ LANGUAGE plpgsql;