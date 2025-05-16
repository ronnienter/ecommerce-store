const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');

// Get user's cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product', 'name price image');
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalPrice: 0
      });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add item to cart
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalPrice: 0
      });
    }
    
    // Check if product already exists in cart
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: req.body.price
      });
    }
    
    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
    
    await cart.save();
    
    cart = await cart.populate('items.product', 'name price image');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update item quantity
router.put('/update/:productId', protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const cartItem = cart.items.find(
      item => item.product.toString() === req.params.productId
    );
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    cartItem.quantity = quantity;
    
    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
    
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );
    
    // Recalculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
    
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Clear cart
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = [];
    cart.totalPrice = 0;
    
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;