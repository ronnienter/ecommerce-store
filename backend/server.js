

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Sample product data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    image: 'https://via.placeholder.com/300'
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest model smartphone with advanced features',
    price: 699.99,
    image: 'https://via.placeholder.com/300'
  },
  {
    id: 3,
    name: 'Laptop',
    description: 'Powerful laptop for work and gaming',
    price: 1299.99,
    image: 'https://via.placeholder.com/300'
  },
  {
    id: 4,
    name: 'Smartwatch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 199.99,
    image: 'https://via.placeholder.com/300'
  }
];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});