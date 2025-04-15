

export default class CartService {
    constructor() {
        this.getCart = this.getCart.bind(this);
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
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    static async getCount() {
        let cart = await this.getCart();
        return cart.reduce((sum, item) => sum + item.count, 0);
    }
};