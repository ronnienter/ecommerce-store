import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll use dummy data instead of API
    const dummyProducts = [
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
    
    setProducts(dummyProducts);
    setLoading(false);
    
    // When backend is ready, uncomment this code:
    // const fetchProducts = async () => {
    //   try {
    //     const { data } = await axios.get('http://localhost:5000/api/products');
    //     setProducts(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //     setLoading(false);
    //   }
    // };
    // fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Latest Products</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;