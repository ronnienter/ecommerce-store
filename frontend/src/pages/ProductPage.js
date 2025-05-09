import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Dummy data for now
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
    
    const foundProduct = dummyProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);
    
    // When backend is ready:
    // const fetchProduct = async () => {
    //   try {
    //     const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    //     setProduct(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching product:', error);
    //     setLoading(false);
    //   }
    // };
    // fetchProduct();
  }, [id]);

  const addToCart = () => {
    // For now, we'll just show an alert
    alert(`Added ${quantity} of ${product.name} to cart`);
    
    // When we implement cart functionality, we'll store in localStorage or state
  };

  if (loading) return <div className="container mx-auto px-4">Loading...</div>;
  if (!product) return <div className="container mx-auto px-4">Product not found</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 py-8">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
            <input 
              type="number" 
              id="quantity"
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border rounded w-16 px-2 py-1"
            />
          </div>
          
          <button 
            onClick={addToCart}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;