import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
    const { userId } = req.query;
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Add to cart option
export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        console.log(userId);
        console.log(productId);
        console.log(quantity);
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    
    console.log(req.body);
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
