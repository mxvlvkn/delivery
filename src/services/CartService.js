

export default class CartService {
    constructor() {
        this.getCart = this.getCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
    }

    static async deleteCart() {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    static async addCart(id, name, image) {
        let cart = await this.getCart();
        const Finded = cart.find(item => item.id === id);

        if (Finded) {
            Finded.count++;
        } else {
            cart.push({
                id,
                name,
                image,
                count: 1
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static async getCart() {
        // Дебаг - сбросить корзину
        // deleteCart();
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    static async getCount() {
        let cart = await this.getCart();
        return cart.reduce((sum, item) => sum + item.count, 0);
    }
    static async setCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};