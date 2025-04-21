import database from '../database/database.js';

export default class DBService {
    constructor() {
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.getUserByNick = this.getUserByNick.bind(this);
    }
    static async getUserByLogin(login) {
        try {
            return {
                data: (await database.query('SELECT * FROM user_admin WHERE login = $1', [login])).rows,
                status: true
            };
        } catch(err) {
            console.log('DB: get user_admin by login error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getUserIdByLogin(login) {
        try {
            return {
                data: (await database.query('SELECT id FROM user_admin WHERE login = $1', [login])).rows[0].id,
                status: true
            };
        } catch(err) {
            console.log('DB: get user_admin id by login error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async saveToken(id, token) {
        try {
            (await database.query('INSERT INTO user_token (user_id, token) values ($1, $2)', [
                id, 
                token,  
            ]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: save token error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getIsTokenExist(token) {
        try {
            const ResData = (await database.query('SELECT id FROM user_token WHERE token = $1', [token])).rows

            return {
                data: [],
                status: ResData.length > 0
            };
        } catch(err) {
            console.log('DB: get is token exist: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async deleteToken(token) {
        try {
            (await database.query('DELETE FROM user_token WHERE token = $1', [token]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: delete token error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async addProduct(values, path, exp) {
        try {
            return {
                data: {
                    id: (await database.query('SELECT save_product($1, $2, $3, $4, $5, $6, $7, $8)', [
                        values.name, 
                        values.isSale, 
                        values.salePrice, 
                        values.price, 
                        values.weight, 
                        values.desc,
                        path, 
                        exp
                    ]))
                },
                status: true
            };
        } catch(err) {
            console.log('DB: add product error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async getProducts() {
        try {
            const ResData = (await database.query('SELECT * FROM product ORDER BY id DESC')).rows

            return {
                data: ResData.map((item) => ({
                    desc: item.description,
                    id: item.id,
                    image: item.img,
                    isSale: item.is_sale,
                    name: item.name,
                    price: item.price,
                    salePrice: item.sale_price,
                    weight: item.weight
                })),
                status: Array.isArray(ResData)
            };
        } catch(err) {
            console.log('DB: get products: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async deleteProduct(id) {
        try {
            const Res = (await database.query('DELETE FROM product WHERE id = $1 RETURNING *', [id])).rows[0];
            return {
                data: Res,
                status: true
            };
        } catch(err) {
            console.log('DB: delete product: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getProduct(id) {
        try {
            const ResData = (await database.query('SELECT * FROM product WHERE id = $1', [id])).rows[0];
            
            return {
                data: {
                    desc: ResData.description,
                    id: ResData.id,
                    image: ResData.img,
                    isSale: ResData.is_sale,
                    name: ResData.name,
                    price: Number(ResData.price),
                    salePrice: Number(ResData.sale_price),
                    weight: Number(ResData.weight)
                },
                status: true
            };
        } catch(err) {
            console.log('DB: get product: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async setProductByID(id, values, path = '') {
        try {
            if (path) {
                await database.query(
                    'UPDATE product SET name = $1, is_sale = $2, sale_price = $3, price = $4, weight = $5, description = $6, img = $7 WHERE id = $8',
                    [
                        values.name,
                        values.isSale,
                        values.salePrice,
                        values.price,
                        values.weight,
                        values.desc,
                        path,
                        id,
                    ]
                );
            } else {
                await database.query(
                    'UPDATE product SET name = $1, is_sale = $2, sale_price = $3, price = $4, weight = $5, description = $6 WHERE id = $7',
                    [
                        values.name,
                        values.isSale,
                        values.salePrice,
                        values.price,
                        values.weight,
                        values.desc,
                        id,
                    ]
                );
            }

            return {
                data: {},
                status: true
            };
        } catch(err) {
            console.log('DB: set product by ID error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async addCategory(values) {
        try {
            (await database.query('INSERT INTO category (name) values ($1)', [
                values.name,
            ]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: add category error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getCategories() {
        try {
            const ResData = (await database.query('SELECT * FROM category ORDER BY id DESC')).rows

            return {
                data: ResData,
                status: Array.isArray(ResData)
            };
        } catch(err) {
            console.log('DB: get categories: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async deleteCategory(id) {
        try {
            const Res = (await database.query('DELETE FROM category WHERE id = $1 RETURNING *', [id])).rows[0];
            return {
                data: Res,
                status: true
            };
        } catch(err) {
            console.log('DB: delete category: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getCategory(id) {
        try {
            const ResData = (await database.query('SELECT * FROM category_with_all_products WHERE id = $1', [id])).rows[0];

            return {
                data: ResData,
                status: true
            };
        } catch(err) {
            console.log('DB: get category: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async setCategoryByID(id, values) {
        try {
            await database.query(
                'UPDATE category SET name = $1 WHERE id = $2',
                [
                    values.name,
                    id,
                ]
            );

            return {
                data: {},
                status: true
            };
        } catch(err) {
            console.log('DB: set category by ID error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async addProductToCategory(values) {
        try {
            (await database.query('INSERT INTO category_product (category_id, product_id) values ($1, $2)', [
                values.categoryID,
                values.productID
            ]));
            
            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: add product to category error: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async deleteProductFromCategory(values) {
        try {
            const Res = (await database.query('DELETE FROM category_product WHERE category_id = $1 AND product_id = $2 RETURNING *', [
                values.categoryID,
                values.productID
            ])).rows[0];
            return {
                data: Res,
                status: true
            };
        } catch(err) {
            console.log('DB: delete product from category: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getMenu() {
        try {
            const ResData = (await database.query('SELECT * FROM category_with_included_products ORDER BY id')).rows

            return {
                data: ResData,
                status: Array.isArray(ResData)
            };
        } catch(err) {
            console.log('DB: get menu: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async getPrices(IDs) {
        try {
            const Data = (await database.query('SELECT id, price, is_sale, sale_price FROM product WHERE id = ANY($1)', [
                IDs
            ])).rows;

            return {
                data: Data,
                status: true
            };
        } catch(err) {
            console.log('DB: get prices error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async beginTransaction() {
        try {
            const Data = (await database.query('BEGIN'));

            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: begin transaction error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async commitTransaction() {
        try {
            const Data = (await database.query('COMMIT'));

            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: commit transaction error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async cancelTransaction() {
        try {
            const Data = (await database.query('ROLLBACK'));

            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: cancel transaction error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
    static async addOrder(values) {
        try {
            const result = await database.query(
                'INSERT INTO orders (name, phone, delivery, address, flat, comment, tools, price, status, order_date, order_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
                [
                    values.name,
                    values.phone,
                    values.delivery,
                    values.address,
                    values.flat,
                    values.comment,
                    values.tools,
                    values.price,
                    values.status,
                    values.order_date,
                    values.order_time
                ]
            );
    
            return {
                data: { id: result.rows[0].id },
                status: true
            };
        } catch (err) {
            console.log('DB: add order error: ' + err);
            return {
                data: [],
                status: false
            };
        }
    }
    static async addCartOrder(values, orderID) {
        try {
            let insertedData = [];
            let queryTail = '';

            values.forEach((item, index) => {
                const i = index * 4;
                queryTail += `($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4}), `;
                insertedData.push(orderID, item.id, item.count, item.price);
            });
            queryTail = queryTail.slice(0, -2);

            await database.query(
                `INSERT INTO product_in_order (order_id, product_id, count, current_price) VALUES ${queryTail}`,
                insertedData
            );
    
            return {
                data: [],
                status: true
            };
        } catch (err) {
            console.log('DB: add cart order error: ' + err);
            return {
                data: [],
                status: false
            };
        }
    }
    static async getOrders() {
        try {
            const ResData = (await database.query('SELECT * FROM orders_with_cart ORDER BY status ASC, id ASC')).rows

            return {
                data: ResData,
                status: Array.isArray(ResData)
            };
        } catch(err) {
            console.log('DB: get orders: ' + err);
            
            return {
                data: [],
                status: false
            };
        }
    }
    static async setOrderStatusByID(values) {
        try {
            await database.query(
                'UPDATE orders SET status = $1 WHERE id = $2',
                [
                    values.status,
                    values.id,
                ]
            );

            return {
                data: [],
                status: true
            };
        } catch(err) {
            console.log('DB: set category by ID error: ' + err);

            return {
                data: [],
                status: false
            };
        }
    }
}