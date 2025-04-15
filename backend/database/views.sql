CREATE OR REPLACE VIEW category_with_all_products AS
WITH distinct_products AS (
    SELECT DISTINCT CP.category_id, CP.product_id
    FROM category_product CP
),
distinct_other_products AS (
    SELECT DISTINCT C.id AS category_id, P.id AS product_id
    FROM category C
    CROSS JOIN product P
    WHERE NOT EXISTS (
        SELECT 1 
        FROM category_product CP2 
        WHERE CP2.category_id = C.id 
        AND CP2.product_id = P.id
    )
)
SELECT 
    C.id AS id,
    C.name AS name,
    COALESCE(
        (SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P1.id,
				'name', P1.name,
				'price', P1.price,
				'isSale', P1.is_sale,
				'salePrice', P1.sale_price,
				'desc', P1.description
            ) ORDER BY P1.id DESC
        ) FROM (
            SELECT DISTINCT DP.product_id
            FROM distinct_products DP
            WHERE DP.category_id = C.id
        ) sub
        JOIN product P1 ON sub.product_id = P1.id),
        '[]'
    ) AS products,
    COALESCE(
        (SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P2.id,
				'name', P2.name,
				'price', P2.price,
				'isSale', P2.is_sale,
				'salePrice', P2.sale_price,
				'desc', P2.description
            ) ORDER BY P2.id DESC
        ) FROM (
            SELECT DISTINCT DOP.product_id
            FROM distinct_other_products DOP
            WHERE DOP.category_id = C.id
        ) sub
        JOIN product P2 ON sub.product_id = P2.id),
        '[]'
    ) AS other
FROM category C
GROUP BY C.id, C.name;

CREATE OR REPLACE VIEW category_with_included_products AS
WITH distinct_products AS (
    SELECT DISTINCT CP.category_id, CP.product_id
    FROM category_product CP
),
distinct_other_products AS (
    SELECT DISTINCT C.id AS category_id, P.id AS product_id
    FROM category C
    CROSS JOIN product P
    WHERE NOT EXISTS (
        SELECT 1 
        FROM category_product CP2 
        WHERE CP2.category_id = C.id 
        AND CP2.product_id = P.id
    )
)
SELECT 
    C.id AS id,
    C.name AS name,
    COALESCE(
        (SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', P1.id,
				'name', P1.name,
				'price', P1.price,
				'isSale', P1.is_sale,
				'salePrice', P1.sale_price,
				'desc', P1.description,
                'weight', P1.weight,
                'image', P1.img
            ) ORDER BY P1.id DESC
        ) FROM (
            SELECT DISTINCT DP.product_id
            FROM distinct_products DP
            WHERE DP.category_id = C.id
        ) sub
        JOIN product P1 ON sub.product_id = P1.id),
        '[]'
    ) AS products
FROM category C
GROUP BY C.id, C.name;