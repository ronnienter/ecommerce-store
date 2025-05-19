const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const connectDB = require('./config/db'); 
const productRoutes = require('./routes/ProductRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const cartRoutes = require('./routes/cartRoutes'); 
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables 
dotenv.config(); 

// Connect to database 
connectDB(); 

const app = express(); 

// Middleware 
app.use(express.json()); 
app.use(cors()); 

// Routes 
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/cart', cartRoutes); 
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
});